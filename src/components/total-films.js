import {createElement} from '../util.js';
import {createCountFilmsTemplate} from '../templates/total-films.js';

export default class TotalFilms {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCountFilmsTemplate();
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

