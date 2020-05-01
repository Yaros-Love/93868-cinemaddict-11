import {createFooterStatTemplate} from '../templates/statistics.js';
import AbstractComponent from './abstract-component.js';

export default class Statistics extends AbstractComponent {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createFooterStatTemplate(this._amount);
  }
}
