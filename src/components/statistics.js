import {createFooterStatTemplate} from '../templates/statistics.js';
import AbstractComponent from './abstract-component.js';

export default class Statistics extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFooterStatTemplate(this._films.length);
  }
}
