import {createElement} from './../utils.js';

const createFilmsTemplate = () => {
  return `<section class="films"></section>`;
};

export default class Films {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsTemplate();
  }

  getElement() {
    if (!this._element) {
      return createElement(this.getTemplate());
    }

    return createElement(this.getTemplate());
  }

  removeElement() {
    this._element = null;
  }
}
