import {createSortTemplate, SortType} from '../templates/sort.js';
import AbstructComponent from './abstract-component.js';

export default class Sort extends AbstructComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }


}
