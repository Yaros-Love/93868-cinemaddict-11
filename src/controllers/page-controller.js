import FilmsContainerComponent from '../components/films-container.js';
import FilmTopRatedContainerComponent from '../components/film-top-rated.js';
import FilmMostCommentedContainerComponent from '../components/film-most-commented.js';
import SortComponent from '../components/sort.js';
import FilmsComponent from '../components/films.js';
import NoFilmComponent from '../components/no-films.js';
import ButtonShowMoreComponent from '../components/buttton-show-more.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {SortType} from '../templates/sort.js';
import MovieController from './movie-controller.js';
import FilterController from '../controllers/filter-controller.js';
import {Method} from "../api";

const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const renderFilmCard = (filmsListElement, films, onDataChange, onViewChange, updateMostCommentedFilms) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsListElement, onDataChange, onViewChange, updateMostCommentedFilms);

    movieController.render(film);

    return movieController;
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.productionDate - a.productionDate);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._showedFilmControllers = [];
    this._showedMostCommentedFilmControllers = [];

    this._showingCardCount = CARD_COUNT;
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = new SortComponent(this._currentSortType);

    this._filmsComponent = new FilmsComponent();

    this._filmsContainerComponent = new FilmsContainerComponent();
    this._noFilmComponent = new NoFilmComponent();
    this._filmTopRatedContainerComponent = new FilmTopRatedContainerComponent();
    this._filmMostCommentedContainerComponent = new FilmMostCommentedContainerComponent();
    this._showMoreButtonComponent = new ButtonShowMoreComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadShowMoreButtonClick = this._onLoadShowMoreButtonClick.bind(this);
    this._renderSort = this._renderSort.bind(this);
    this._updateMostCommentedFilms = this._updateMostCommentedFilms.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);

    this._filterController = null;
    this._filmListElement = null;
    this._filmsListContainerElement = null;
    this._filmTopRatedElement = null;
    this._filmMostCommentedElement = null;
  }

  render() {
    const container = this._container;
    const films = this._moviesModel.getFilms();

    this._renderFilterComponent(container, this._moviesModel);
    this._renderSort();
    render(container, this._filmsComponent);

    const isNoFilmsData = films.length === 0;
    const filmsElement = container.querySelector(`.films`);


    if (isNoFilmsData) {
      render(filmsElement, this._filmsContainerComponent);
      render(filmsElement, this._noFilmComponent);
      return;
    }

    render(filmsElement, this._filmsContainerComponent);
    render(filmsElement, this._filmTopRatedContainerComponent);
    render(filmsElement, this._filmMostCommentedContainerComponent);

    this._filmListElement = container.querySelector(`.films-list`);
    this._filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
    this._filmTopRatedElement = container.querySelector(`#top-rated .films-list__container`);
    this._filmMostCommentedElement = container.querySelector(`#most-commented .films-list__container`);

    this._renderFilms(films.slice(0, this._showingCardCount));

    this._renderTopRatedFilms(this._moviesModel.getTopRatedFilms().slice(0, EXTRA_CARD_COUNT));
    this._renderMostCommentedFilms(this._moviesModel.getMostCommentedFilms().slice(0, EXTRA_CARD_COUNT));


    this._renderShowMoreButton(films.slice(0, this._showingCardCount));
  }

  _renderFilterComponent(container, moviesModel) {
    this._filterController = new FilterController(container, moviesModel);

    this._filterController.render();
  }

  _rerenderSortComponent(sortType) {
    remove(this._sortComponent);
    this._sortComponent = null;
    this._sortComponent = new SortComponent(sortType);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._renderSort();
  }
  _renderSort() {
    const navElement = this._container.querySelector(`.main-navigation`);
    render(navElement, this._sortComponent, RenderPosition.AFTEREND);
  }

  _renderFilms(films) {
    const newFilms = renderFilmCard(this._filmsListContainerElement, films.slice(0, this._showingCardCount), this._onDataChange, this._onViewChange, this._updateMostCommentedFilms);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

  }

  _renderTopRatedFilms(films) {
    const newFilms = renderFilmCard(this._filmTopRatedElement, films.slice(0, this._showingCardCount), this._onDataChange, this._onViewChange, this._updateMostCommentedFilms);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
  }

  _renderMostCommentedFilms(films) {
    this._filmMostCommentedContainerComponent = new FilmMostCommentedContainerComponent();
    const newFilms = renderFilmCard(this._filmMostCommentedElement, films.slice(0, this._showingCardCount), this._onDataChange, this._onViewChange, this._updateMostCommentedFilms);

    this._showedMostCommentedFilmControllers = newFilms;
  }

  _removeFilms(controllers) {
    controllers.forEach((filmController) => filmController.destroy());
    controllers = [];
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingCardCount >= this._moviesModel.getFilms().length) {
      return;
    }

    render(this._filmListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(this._onLoadShowMoreButtonClick);
  }

  _onLoadShowMoreButtonClick() {
    const films = this._moviesModel.getFilms();
    const prevFilmCount = this._showingCardCount;

    this._showingCardCount = this._showingCardCount + CARD_COUNT;

    const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmCount, this._showingCardCount);

    this._renderFilms(sortedFilms);

    if (this._showingCardCount >= this._moviesModel.getFilms().length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onSortTypeChange(sortType) {
    this._showingCardCount = CARD_COUNT;

    const sortedFilms = getSortedFilms(this._moviesModel.getFilms(), sortType, 0, this._showingCardCount);
    const sortedTopRated = getSortedFilms(this._moviesModel.getTopRatedFilms(), sortType, 0, EXTRA_CARD_COUNT);
    const sortedMostCommented = getSortedFilms(this._moviesModel.getMostCommentedFilms(), sortType, 0, EXTRA_CARD_COUNT);

    this._removeFilms(this._showedFilmControllers);
    this._removeFilms(this._showedMostCommentedFilmControllers);
    this._renderFilms(sortedFilms);
    this._renderMostCommentedFilms(sortedMostCommented);
    this._renderTopRatedFilms(sortedTopRated);

    this._renderShowMoreButton();
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _updateFilms(count = this._showingCardCount) {
    this._removeFilms(this._showedFilmControllers);
    this._removeFilms(this._showedMostCommentedFilmControllers);
    this._renderFilms(this._moviesModel.getFilms().slice(0, count));
    this._renderMostCommentedFilms(this._moviesModel.getMostCommentedFilms().slice(0, EXTRA_CARD_COUNT));
    this._renderTopRatedFilms(this._moviesModel.getTopRatedFilms().slice(0, EXTRA_CARD_COUNT));

    this._renderShowMoreButton();
  }

  _updateMostCommentedFilms() {
    this._removeFilms(this._showedMostCommentedFilmControllers);
    remove(this._filmMostCommentedContainerComponent);

    this._renderMostCommentedFilms(this._moviesModel.getMostCommentedFilms().slice(0, EXTRA_CARD_COUNT));
  }

  _onDataChange(filmController, oldData, newData, requestMethod) {
    let isSuccess;
    switch (requestMethod) {
      case Method.PUT:
        this._api.updateFilm(oldData.id, newData)
          .then((movieModel) => {
            isSuccess = this._moviesModel.updateFilms(oldData.id, movieModel);
            this._renderUpdatedMovieModel(isSuccess, oldData, movieModel);
          });
        break;

      case Method.POST:
        this._api.createComment(oldData.id, newData)
          .then((movieModel) => {
            isSuccess = this._moviesModel.updateFilms(oldData.id, movieModel);
            this._renderUpdatedMovieModel(isSuccess, oldData, movieModel);
          })
          .catch(() => {
            filmController.shakeForm();
            filmController.showErrorBorderOnInput();
          });
        break;

      case Method.DELETE:
        this._api.deleteComment(newData)
          .then(() => {
            const comments = oldData.comments.filter((comment) => {
              return comment.id !== newData;
            });

            const updatedFilm = Object.assign(oldData, {comments});

            isSuccess = this._moviesModel.updateFilms(oldData.id, updatedFilm);
            this._renderUpdatedMovieModel(isSuccess, oldData, updatedFilm);
          })
          .catch(() => {
            filmController.shakeComment(newData);
          });
        break;
    }

  }

  _renderUpdatedMovieModel(isSuccess, oldData, newData) {
    if (!isSuccess) {
      return;
    }

    const allShowedControllers = this._showedFilmControllers.concat(this._showedFilmControllers, this._showedMostCommentedFilmControllers);
    const showedFilmControllers = allShowedControllers.filter((controller) => controller.getFilm() === oldData);
    showedFilmControllers.forEach((controller) => controller.render(newData));
  }

  _onFilterChange() {
    this._showingCardCount = CARD_COUNT;
    this._currentSortType = SortType.DEFAULT;

    this._onSortTypeChange(this._currentSortType);
    this._rerenderSortComponent(this._currentSortType);

    this._updateFilms(CARD_COUNT);
    this._updateMostCommentedFilms();
  }

  hide() {
    const activeFilterElement = this._container.querySelector(`.main-navigation__item.main-navigation__item--active`);
    const statsElement = this._container.querySelector(`.main-navigation__additional`);

    remove(this._sortComponent);
    this._filmsComponent.hide();

    activeFilterElement.classList.remove(`main-navigation__item--active`);
    statsElement.classList.add(`main-navigation__additional--active`);
  }

  show() {
    const statsElement = this._container.querySelector(`.main-navigation__additional`);
    statsElement.classList.remove(`main-navigation__additional--active`);
    this._filterController.render();

    this._filmsComponent.show();
    this._showingCardCount = CARD_COUNT;
    this._updateFilms();
  }
}
