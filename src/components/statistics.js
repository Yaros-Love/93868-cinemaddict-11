import {createElement} from './../utils.js';
import {createFooterStatTemplate} from '../templates/statistics.js';

export default class Statistics {
  constructor(amount) {
    this._amount = amount;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatTemplate(this._amount);
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
