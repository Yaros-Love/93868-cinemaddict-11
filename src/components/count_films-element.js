import {createElement} from '../util.js';

const createCountFilmsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

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

