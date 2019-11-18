import React from 'react';
import {observer, inject} from 'mobx-react';
import {Header, Poster} from '../components';
import Link from 'next/link';

@inject('store')
@observer
class Favorites extends React.Component {
  removeFavorite = (imdbID) => {
    this.props.store.delFavorite(imdbID);
  };

  render() {
    return (
      <div>
        <Header title='Favorilerim'/>
        <div className='container'>
          <div className='welcome'>
            <h1 className='title'>
              Favorilerim ({this.props.store.getCount})
              <Link href='/'>
                <a className='favorites'>Aramaya Dön</a>
              </Link>
            </h1>
          </div>
          <div className='results'>
            <div className='row'>
              {this.props.store.favorites.map((item, key) =>
                <Poster detail={item} key={key}/>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Favorites;
