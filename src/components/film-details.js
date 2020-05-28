import {createFilmDetailsTemplate, createPlaceholderEmojiMarkup} from '../templates/film-details';
import AbstractSmartComponent from './abstract-smart-component.js';
import {encode} from 'he';
import moment from "moment";
import {createElement} from "../utils/render";

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._addWatchListHandler = null;
    this._markAsWatchedHandler = null;
    this._favoriteHandler = null;
    this._closeEscButtonHandler = null;
    this._deleteButtonClickHandler = null;
    this._addNewCommentHandler = null;

    this._commentEmoji = null;
    this._element = this.getElement();

    this._setEmojiClickHandler();
    this._setRemoveRedBorderClickHandler();
  }
  recoveryListeners() {
    this.setCardAddToWatchListClickHandler(this._addWatchListHandler);
    this.setCardMarkAsWatchedClickHandler(this._markAsWatchedHandler);
    this.setCardFavoriteClickHandler(this._favoriteHandler);
    this.setCloseButtonClickHandler(this._closeEscButtonHandler);
    this._setEmojiClickHandler();
    this._setRemoveRedBorderClickHandler();
    this.setDeleteCommentClickHandler(this._deleteButtonClickHandler);
    this.setAddNewCommentHandler(this._addNewCommentHandler);
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
    const commentButtonList = this._element.querySelectorAll(`.film-details__comment-delete`);

    if (commentButtonList) {
      Array.from(commentButtonList).forEach((button) => button.addEventListener(`click`, handler));
    }

    this._deleteButtonClickHandler = handler;
  }

  setAddNewCommentHandler(handler) {
    const textCommentElement = this._element.querySelector(`.film-details__comment-input`);
    textCommentElement.addEventListener(`keydown`, handler);

    this._addNewCommentHandler = handler;
  }

  _setEmojiClickHandler() {
    const emojiList = this._element.querySelector(`.film-details__emoji-list`);

    emojiList.addEventListener(`click`, (evt) => {
      const emojiLabelElement = evt.target.closest(`.film-details__emoji-label`);

      if (emojiLabelElement) {
        const emojiControlElement = emojiLabelElement.control;
        const emoji = emojiControlElement.value;

        this._commentEmoji = emoji;

        const placeHolderEmojiMarkup = createPlaceholderEmojiMarkup(this._commentEmoji);
        const emojiLabelPlaceholder = this._element.querySelector(`.film-details__add-emoji-label`);
        emojiLabelPlaceholder.parentNode.replaceChild(createElement(placeHolderEmojiMarkup), emojiLabelPlaceholder);
      }
    });
  }

  _setRemoveRedBorderClickHandler() {
    const commentInput = this._element.querySelector(`.film-details__comment-input`);
    commentInput.addEventListener(`click`, () => {
      commentInput.style.border = `none`;
    });
  }

  getNewComment() {
    const textCommentElement = this._element.querySelector(`.film-details__comment-input`);

    const text = encode(textCommentElement.value);
    const emotion = this._commentEmoji;

    if (!emotion || !text) {
      return null;
    }

    const date = moment().format();

    return {
      text,
      emotion,
      date,
    };
  }
}

