import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import {render, remove, RenderPosition, replace} from '../utils/render.js';
import Movie from "../models/movie";
import {Method} from "../api";

const Mode = {
  DEFAULT: `default`,
  OPEN: `open`,
};

const isCmdEnterKeysCode = (evt) => {
  return evt.code === `Enter` && (evt.ctrlKey || evt.metaKey);
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange, updateMostCommentedFilms) {
    this._film = null;
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._updateMostCommented = updateMostCommentedFilms;
    this._mode = Mode.DEFAULT;
    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._openFilmPopup = this._openFilmPopup.bind(this);
    this._closeFilmPopup = this._closeFilmPopup.bind(this);
  }

  render(film) {
    this._film = film;
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;
    this._filmComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmComponent.setCardClickHandler(this._openFilmPopup);

    this._filmDetailsComponent.setCloseButtonClickHandler(this._closeFilmPopup);

    this._filmComponent.setCardAddToWatchListClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = Movie.cloneMovie(film);
      newFilm.isInWatchList = !newFilm.isInWatchList;
      this._onDataChange(this, film, newFilm, Method.PUT);
    });

    this._filmComponent.setCardMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = Movie.cloneMovie(film);
      newFilm.isInWatched = !newFilm.isInWatched;
      this._onDataChange(this, film, newFilm, Method.PUT);
    });

    this._filmComponent.setCardFavoriteClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = Movie.cloneMovie(film);
      newFilm.isInFavorite = !newFilm.isInFavorite;
      this._onDataChange(this, film, newFilm, Method.PUT);
    });

    this._filmDetailsComponent.setCardAddToWatchListClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = Movie.cloneMovie(film);
      newFilm.isInWatchList = !newFilm.isInWatchList;
      this._onDataChange(this, film, newFilm, Method.PUT);
    });

    this._filmDetailsComponent.setCardMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = Movie.cloneMovie(film);
      newFilm.isInWatched = !newFilm.isInWatched;
      this._onDataChange(this, film, newFilm, Method.PUT);
    });

    this._filmDetailsComponent.setCardFavoriteClickHandler((evt) => {
      evt.preventDefault();

      const newFilm = Movie.cloneMovie(film);
      newFilm.isInFavorite = !newFilm.isInFavorite;
      this._onDataChange(this, film, newFilm, Method.PUT);
    });

    this._filmDetailsComponent.setDeleteCommentClickHandler((evt) => {
      evt.preventDefault();

      const deleteButtonElement = evt.target;
      const commentItem = deleteButtonElement.closest(`.film-details__comment`);
      const removeCommentId = commentItem.dataset.commentId;

      // const comments = this._film.comments.filter((comment) => {
      //   return comment.id !== removeCommentId;
      // });


      // this._onDataChange(this, this._film, Object.assign(this._film, {comments}));
      this._onDataChange(this, this._film, removeCommentId, Method.DELETE);
    });

    this._filmDetailsComponent.setAddNewCommentHandler((evt) => {
      if (isCmdEnterKeysCode(evt)) {
        const comment = this._filmDetailsComponent.getNewComment();

        if (comment) {
          const newComment = {
            "comment": comment.text,
            "date": comment.date,
            "emotion": comment.emotion
          };

          this._onDataChange(this, this._film, newComment, Method.POST);
        }
      }
    });

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _openFilmPopup() {
    this._onViewChange();
    const footerElement = document.querySelector(`.footer`);
    render(footerElement, this._filmDetailsComponent, RenderPosition.AFTEREND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.OPEN;
  }

  _closeFilmPopup() {
    document.querySelector(`body`).removeChild(this._filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._updateMostCommented();
    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmPopup();
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeFilmPopup();
    }
  }
  getFilm() {
    return this._filmComponent.getFilmData();
  }
}
