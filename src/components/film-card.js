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
}
