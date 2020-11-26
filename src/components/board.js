import {createBoardTemplate} from '../templates/board.js';
import AbstractComponent from './abstract-component.js';

export default class Board extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createBoardTemplate(this._films);
  }

}
