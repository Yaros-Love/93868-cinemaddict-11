import {getFilmsByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';

const getTopRatedFilms = (films) => {
  return films.sort((a, b) => b.rating - a.rating);
};

const getMostCommentedFilms = (films) => {
  const isAllFilmsWithoutComments = films.every((film) => film.comments.length === 0);

  if (isAllFilmsWithoutComments) {
    return [];
  }

  return films
    .filter((film) => film.comments.length > 0)
    .sort((a, b) => b.comments.length - a.comments.length);
};

export default class Movies {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getTopRatedFilms() {
    return getTopRatedFilms(this.getFilms());
  }

  getMostCommentedFilms() {
    return getMostCommentedFilms(this.getFilms());
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;

    this._callHandlers(this._filterChangeHandlers);
  }

  updateFilms(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
