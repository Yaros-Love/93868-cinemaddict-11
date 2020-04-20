import {createElement} from './../utils.js';
import {createMenuTemplate} from './../templates/menu.js';


export default class Menu {
  constructor(filters) {
    this._filters = filters;
    this.element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
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
