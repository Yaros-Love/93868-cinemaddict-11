import {createElement} from '../util.js';
import {createFilmListContainerTemplate} from '../templates/film_list-container';

export default class FilmListContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListContainerTemplate();
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
