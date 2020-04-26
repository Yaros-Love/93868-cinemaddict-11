import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import {render, RenderPosition } from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._filmComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmComponent.setCardClickHandler(this._openFilmPopup);
    this._filmDetailsComponent.setCloseButtonClickHandler(this._closeFilmPopup);

    render(this._container, this._filmComponent);
  }

  _openFilmPopup() {
    const footerElement = document.querySelector(`.footer`);
    render(footerElement, this._filmDetailsComponent, RenderPosition.AFTEREND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closeFilmPopup() {
    document.querySelector(`body`).removeChild(this._filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeFilmPopup();
    }
  };
}
