import {createNavMenuTemplate} from '../templates/nav-menu.js';
import AbstractComponent from './abstract-component.js';

export default class NavMenu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createNavMenuTemplate(this._filters);
  }
}
