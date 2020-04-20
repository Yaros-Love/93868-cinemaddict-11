import {createElement} from '../utils.js';
import {createFilmTopRatedContainerTemplate} from '../templates/film-top-raited.js';


export default class FilmTopRated {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmTopRatedContainerTemplate();
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
