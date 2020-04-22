import {createMenuTemplate} from './../templates/menu.js';
import AbstructComponent from './abstract-component.js';


export default class Menu extends AbstructComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }
}
