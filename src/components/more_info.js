import {createElement} from '../util.js';
import {createMoreInfoTemplate} from '../templates/more_info.js';

export default class MoreInfo {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createMoreInfoTemplate(this._film);
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

