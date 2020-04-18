import {createElement} from '../utils.js';
import {createFilmMostCommentedContainerTemplate} from '../templates/film-most-commented.js';


export default class FilmMostCommented {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmMostCommentedContainerTemplate();
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
