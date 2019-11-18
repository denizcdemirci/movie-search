import App from 'next/app';
import {Provider} from 'mobx-react';
import {FavoriteStore} from '../store/favoriteStore.js';
import '../style/index.scss';

class Search extends App {
  state = {
    store: new FavoriteStore()
  };

  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    return {...appProps};
  }

  render() {
    const {Component, pageProps} = this.props;

    return (
      <Provider store={this.state.store}>
        <Component {...pageProps}/>
      </Provider>
    )
  }
}

export default Search;
