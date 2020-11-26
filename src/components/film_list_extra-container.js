import {createFilmsListExtraTemplate} from '../templates/film_list_extra-container';
import AbstractComponent from './abstract-component.js';

export default class ExtraFilmContainer extends AbstractComponent {
  constructor(item) {
    super();
    this._item = item;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this._item);
  }
}
