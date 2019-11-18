import React from 'react';
import {inject, observer} from 'mobx-react';
import {Favorite} from '../../models/Favorite';

@inject('store')
@observer
class Poster extends React.Component {
  defaultPoster = 'https://via.placeholder.com/300x429?text=No%20Poster';

  addFavorite = (movie) => {
    this.props.store.addFavorite(
      new Favorite(movie)
    );
  };

  removeFavorite = (imdbID) => {
    this.props.store.delFavorite(imdbID);
  };

  render() {
    return (
      <div className='col-12 col-sm-6 col-md-4 col-lg-3' key={this.props.detail.imdbID}>
        <div className='result-item' title={this.props.detail.Title}>
          <img className='result-poster'
               src={this.props.detail.Poster !== 'N/A' ? this.props.detail.Poster : this.defaultPoster}/>
          <div className='result-poster-bg'>
            {this.props.store.isExists(this.props.detail.imdbID) ?
              <div className='heart heart-active' onClick={this.removeFavorite.bind(this, this.props.detail.imdbID)}/>
              :
              <div className='heart' onClick={this.addFavorite.bind(this, this.props.detail)}/>}
            <div className='result-info'>
              <p className='name'>{this.props.detail.Title}</p>
              <p className='year'>{this.props.detail.Year}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Poster;
