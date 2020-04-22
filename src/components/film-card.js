import {createFilmCardTemplate} from './../templates/film-card.js';
import AbstructComponent from './abstract-component.js';


export default class FilmCard extends AbstructComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
}
