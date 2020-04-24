import {createFooterStatTemplate} from '../templates/statistics.js';
import AbstructComponent from './abstract-component.js';

export default class Statistics extends AbstructComponent {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createFooterStatTemplate(this._amount);
  }
}
