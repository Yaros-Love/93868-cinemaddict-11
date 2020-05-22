import AbstractComponent from "./abstract-component";
import {formatCommentDate} from "../utils/common";

export default class FilmCommentComponent extends AbstractComponent {
  constructor({id, comment, emotion, author, date}) {
    super();
    this._id = id;
    this._emoji = emotion;
    this._text = comment;
    this._author = author;
    this._date = formatCommentDate(date);
  }

  getTemplate() {
    return ` <li class="film-details__comment" data-comment-id="${this._id}">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${this._emoji}.png" width="55" height="55" alt="emoji-${this._emoji}">
        </span>
        <div>
          <p class="film-details__comment-text">${this._text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${this._author}</span>
            <span class="film-details__comment-day">${this._date}</span>
            <button class="film-details__comment-delete" data-comment-id="${this._id}">Delete</button>
          </p>
        </div>
      </li>`;
  }


}
