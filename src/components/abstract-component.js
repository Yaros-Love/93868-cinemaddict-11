import {createElement} from '../utils.js';

export default class AbstructComponent {
  constructor() {
    if (new.target === AbstructComponent) {
      throw new Error(`Can't initiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
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
