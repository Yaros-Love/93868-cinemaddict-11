import {createMenuTemplate} from './../templates/menu.js';
import AbstractComponent from './abstract-component.js';


export default class Menu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}
