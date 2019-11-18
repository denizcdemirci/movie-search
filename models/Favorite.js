import {observable} from 'mobx';

export class Favorite {

  // set default for defense
  @observable Title = '????';
  @observable Year = '0000';
  @observable Type = 'movie';
  @observable Poster = 'https://via.placeholder.com/300x430?text=No%20Poster';
  @observable imdbID = 'XXXX';

  constructor(item) {
    this.Title = item.hasOwnProperty('Title') ? item.Title : this.Title;
    this.Year = item.hasOwnProperty('Year') ? item.Year : this.Year;
    this.Type = item.hasOwnProperty('Type') ? item.Type : this.Type;
    this.Poster = item.Poster !== 'N/A' ? item.Poster : this.Poster;
    this.imdbID = item.hasOwnProperty('imdbID') ? item.imdbID : this.imdbID;
  }
}
