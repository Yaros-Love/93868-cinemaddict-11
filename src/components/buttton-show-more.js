import {createElement} from './../utils.js';
import {createButtonShowMoreTemplate} from './../templates/button-show-more.js';


export default class ButtonShowMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonShowMoreTemplate();
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
