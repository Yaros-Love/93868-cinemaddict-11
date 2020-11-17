import {createElement} from '../util.js';
import {createFilmsListExtraTemplate} from '../templates/film_list_extra-container';

export default class ExtraFilmContainer {
  constructor(item) {
    this._item = item;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this._item);
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
