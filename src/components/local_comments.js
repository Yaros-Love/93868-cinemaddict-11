import {createLocalComment} from '../templates/local_comment.js';
import AbstractComponent from './abstract-component.js';

export default class LocalComment extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createLocalComment(this._film);
  }
}
