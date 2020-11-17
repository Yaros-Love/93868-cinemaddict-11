import {createElement} from '../util.js';
import {createLocalComment} from '../templates/local_comment.js';

export default class LocalComment {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createLocalComment(this._film);
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
