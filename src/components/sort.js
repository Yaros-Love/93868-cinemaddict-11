import {createSortTemplate, SortType} from '../templates/sort.js';
import AbstractComponent from './abstract-component.js';

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      const sortButtonsList = this.getElement().querySelectorAll(`a`);
      sortButtonsList.forEach((element) => {
        element.classList.remove(`sort__button--active`);
      });
      evt.target.classList.add(`sort__button--active`);

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
