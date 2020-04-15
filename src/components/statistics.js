import {createElement} from './../utils.js';

const createFooterStatTemplate = (moviesCount) => {
  let numberFormat = new Intl.NumberFormat(`ru`);
  numberFormat = numberFormat.format(moviesCount);

  return (
    `<p>${numberFormat} movies inside</p>`
  );
};

export default class Statistics {
  constructor(amount) {
    this._amount = amount;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatTemplate(this._amount);
  }

  getElement() {
    if (!this._element) {
      return createElement(this.getTemplate());
    }

    return createElement(this.getTemplate());
  }

  removeElement() {
    this._element = null;
  }
}
