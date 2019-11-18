import {observable, action, computed, autorun} from 'mobx';
import {useStaticRendering} from 'mobx-react'

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

const localStorageKey = 'favorites';

export class FavoriteStore {
  constructor() {
    if (!isServer) {
      this.favorites = this.fetchInitialStoreState();
    }

    autorun(() => {
      if (!isServer) {
        localStorage.setItem(localStorageKey, JSON.stringify(this.favorites));
      }
    });
  };

  @observable favorites = [];

  @action addFavorite = (item) => {
    this.favorites.push(item);
  };

  @action delFavorite = (imdbID) => {
    this.favorites.replace(this.favorites.filter((item) => item.imdbID !== imdbID));
  };

  @computed get getCount() {
    return this.favorites.length;
  };

  // util
  isExists = (imdbID) => {
    return this.favorites.filter((item) => item.imdbID === imdbID).length >= 1;
  };

  fetchInitialStoreState = () => {
    let ls = localStorage.getItem(localStorageKey);

    if (!ls) {
      return [];
    }

    return JSON.parse(ls);
  }
}

