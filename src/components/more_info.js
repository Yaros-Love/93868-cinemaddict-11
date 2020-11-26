import {createMoreInfoTemplate} from '../templates/more_info.js';
import AbstractComponent from './abstract-component.js';

export default class MoreInfo extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createMoreInfoTemplate(this._film);
  }
}

