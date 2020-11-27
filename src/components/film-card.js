import {createFilmCardTemplate} from '../templates/film-card.js';
import AbstractComponent from './abstract-component.js';

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setCardClickHandler(handler) {
    this._element.querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this._element.querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}
