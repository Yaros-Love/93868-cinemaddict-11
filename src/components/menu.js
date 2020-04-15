import {createElement} from './../utils.js';

const createFilterMarkup = (filter, isActive) => {
  const isFilterAll = !!(filter.name === `all`);
  return (`
    <a href="#${filter.name}" class="main-navigation__item
    ${isActive ? `main-navigation__item--active` : ``}">
    ${filter.title}
      ${isFilterAll ? `` : `<span class="main-navigation__item-count">${filter.count}</span>`}
    </a>`);
};

const createMenuTemplate = (filters) => {
  const filterMarkup = filters.map((item, i) => createFilterMarkup(item, i === 0)).join(`\n`);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class Menu {
  constructor(filters) {
    this._filters = filters;
    this.element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
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
