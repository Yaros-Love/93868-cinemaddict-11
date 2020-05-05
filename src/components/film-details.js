import {createFilmDetailsTemplate} from './../templates/film-details.js';
import AbstractSmartComponent from './abstract-smart-component.js';

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._comments = film.comments;

    this._addWatchListHandler = null;
    this._markAsWatchedHandler = null;
    this._favoriteHandler = null;
    this._closeEscButtonHandler = null;
    this._deleteButtonHandler = null;

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
    this.setDeleteCommentClickHandler(this._deleteButtonHandler);
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

  setDeleteCommentClickHandler(handler) {
    const commentList = this._element.querySelectorAll(`.film-details__comment`);

    commentList.forEach((comment) => {
      comment.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName !== `BUTTON`) {
          return;
        }

        // this._updatedComments = this._comments.filter((item) => item.id !== evt.target.dataset.commentId);

        // this._film.comments = this._updatedComments;

        const index = this._comments.findIndex((it) => it.id === evt.target.dataset.commentId);
        console.log(index);


        this._deleteButtonHandler = handler;

        handler(index);
      });
    });
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

