import {createElement} from './../utils.js';
import {createNoFilmsTemplate} from './../templates/no-films.js';

export default class ButtonShowMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFilmsTemplate();
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

