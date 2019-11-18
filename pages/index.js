import React from 'react';
import {observer, inject} from 'mobx-react';
import Link from 'next/link'
import {Header, Poster} from '../components';
import Api from '../api/index.js';

@inject('store')
@observer
class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQueryKeyword: '',
      searchQueryYear: '',
      searchQueryType: 'movie',
      searchQueryTypeOptions: ['movie', 'series', 'episode'],
      searchResponse: [],
      hasError: false,
      errorMsg: ''
    };
  }

  search = () => {
    Api.search(this.state.searchQueryKeyword, this.state.searchQueryYear, this.state.searchQueryType)
      .then(response => {
        if (response.data.Response === 'True') {
          this.setState({searchResponse: response.data.Search, hasError: false, errorMsg: ''});
        } else {
          this.setState({searchResponse: [], hasError: true, errorMsg: response.data.Error});
        }
      })
      .catch(error => {
        this.setState({searchResponse: [], hasError: true, errorMsg: error});
      });
  };

  handleEnterEvent(e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  render() {
    return (
      <div>
        <Header title='Anasayfa'/>
        <div className='container'>
          <div className='welcome'>
            <h1 className='title'>Movie Search
              <Link href='/favorites'>
                <a className='favorites'>Favorilerim ({this.props.store.getCount})</a>
              </Link>
            </h1>
          </div>
          <div className='search'>
            <div className='form-row'>
              <div className='col-6 col-sm-6'>
                <input type='text' className='form-control' value={this.state.searchQueryKeyword} placeholder='Film adı'
                       onChange={e => this.setState({searchQueryKeyword: e.target.value})}
                       onKeyPress={e => this.handleEnterEvent(e)}/>
              </div>
              <div className='col-6 col-sm-2'>
                <input type='text' className='form-control' value={this.state.searchQueryYear} placeholder='Yılı'
                       onChange={e => this.setState({searchQueryYear: e.target.value})}
                       onKeyPress={e => this.handleEnterEvent(e)}/>
              </div>
              <div className='col-6 col-sm-2'>
                <select id='type' className="form-control" value={this.state.searchQueryType}
                        onChange={e => this.setState({searchQueryType: event.target.value})}>
                  {this.state.searchQueryTypeOptions.map((option, key) =>
                    <option key={key}>{option}</option>
                  )}
                </select>
              </div>
              <div className='col-6 col-sm-2'>
                <button className='btn btn-full' onClick={this.search}>Ara</button>
              </div>
            </div>
          </div>
          <div className='results'>
            {this.state.hasError ?
              (<div className='results-error'>{this.state.errorMsg} 😕</div>) :
              (<div className='row'>
                {this.state.searchResponse.map((item, key) =>
                  <Poster detail={item} key={key}/>
                )}
              </div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
