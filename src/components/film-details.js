import {createFilmDetailsTemplate} from './../templates/film-details.js';
import AbstructComponent from './abstract-component.js';

export default class FilmDetails extends AbstructComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

}

