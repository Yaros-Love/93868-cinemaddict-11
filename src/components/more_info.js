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

  setCloseButtonClickHandler(handler) {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }
}

