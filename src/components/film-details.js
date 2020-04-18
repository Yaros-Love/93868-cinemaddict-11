import {createElement} from './../utils.js';
import {createFilmDetailsTemplate} from './../templates/film-details.js';

export default class FilmDetails {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

