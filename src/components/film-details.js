import {createFilmDetailsTemplate} from './../templates/film-details.js';
import AbstractSmartComponent from './abstract-smart-component.js';

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._addWatchListHandler = null;
    this._markAsWatchedHandler = null;
    this._favoriteHandler = null;
    this._closeEscButtonHandler = null;

    this._commentEmoji = null;
    this._element = this.getElement();

    this._setEmojiClickHandler();

  }
  recoveryListeners() {
    this.setCardAddToWatchListClickHandler(this._addWatchListHandler);
    this.setCardMarkAsWatchedClickHandler(this._markAsWatchedHandler);
    this.setCardFavoriteClickHandler(this._favoriteHandler);
    this.setCloseButtonClickHandler(this._closeEscButtonHandler);
    this._setEmojiClickHandler();
  }
  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._commentEmoji);
  }

  setCardAddToWatchListClickHandler(handler) {
    this._element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);

    this._addWatchListHandler = handler;
  }
  setCardMarkAsWatchedClickHandler(handler) {
    this._element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);

    this._markAsWatchedHandler = handler;
  }
  setCardFavoriteClickHandler(handler) {
    this._element.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);

    this._favoriteHandler = handler;
  }
  setCloseButtonClickHandler(handler) {
    this._element.querySelector(`.film-details .film-details__close-btn`).addEventListener(`click`, handler);

    this._closeEscButtonHandler = handler;
  }

  _setEmojiClickHandler() {
    const emojiList = this._element.querySelector(`.film-details__emoji-list`);

    emojiList.addEventListener(`click`, (evt) => {
      const emojiLabelElement = evt.target.closest(`.film-details__emoji-label`);

      if (emojiLabelElement) {
        const emojiControlElement = emojiLabelElement.control;
        const emoji = emojiControlElement.value;

        this._commentEmoji = emoji;

        this.rerender();
      }
    });

  }
}

