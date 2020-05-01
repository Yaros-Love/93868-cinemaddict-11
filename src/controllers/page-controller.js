import FilmsContainerComponent from '../components/films-container.js';
import FilmTopRatedContainerComponent from '../components/film-top-rated.js';
import FilmMostCommentedContainerComponent from '../components/film-most-commented.js';
import MenuComponent from '../components/menu.js';
import SortComponent from '../components/sort.js';
import FilmsComponent from '../components/films.js';
import NoFilmComponent from '../components/no-films.js';
import ButtonShowMoreComponent from '../components/buttton-show-more.js';
import {remove, render} from '../utils/render.js';
import {getFilters} from '../mock/filter.js';
import {SortType} from '../templates/sort.js';
import MovieController from './movie-controler.js';


const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const renderFilmCard = (filmsListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsListElement, onDataChange, onViewChange);

    movieController.render(film);

    return movieController;
  });
};

const getSortedTasks = (films, sortType, from, to) => {
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
  constructor(container) {
    this._container = container;
    this._films = [];
    this._showedFilmControllers = [];
    this._showingCardCount = CARD_COUNT;
    this._sortComponent = new SortComponent();
    this._filmsComponent = new FilmsComponent();

    this._filmsContainerComponent = new FilmsContainerComponent();
    this._noFilmComponent = new NoFilmComponent();
    this._filmTopRatedContainerComponent = new FilmTopRatedContainerComponent();
    this._filmMostCommentedContainerComponent = new FilmMostCommentedContainerComponent();
    this._showMoreButton = new ButtonShowMoreComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);


    this._filmListElement = null;
    this._filmsListContainerElement = null;

  }

  render(films) {
    const container = this._container;
    this._films = films;

    const filters = getFilters();

    render(container, new MenuComponent(filters));
    render(container, this._sortComponent);
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

    const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);

    filmsListExtraElements.forEach((box) => {
      const newFilms = renderFilmCard(box, this._films
        .slice(0, EXTRA_CARD_COUNT));

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    });

    const newFilms = renderFilmCard(this._filmsListContainerElement, this._films.slice(0, this._showingCardCount), this._onDataChange, this._onViewChange);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    if (this._showingCardCount >= this._films.length) {
      return;
    }

    render(this._filmListElement, this._showMoreButton);

    this._showMoreButton.setClickHandler(() => {
      const prevFilmCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + CARD_COUNT;

      const sortedFilms = getSortedTasks(this._films, this._sortComponent.getSortType(), prevFilmCount, this._showingCardCount);

      const newFilms = renderFilmCard(this._filmsListContainerElement, sortedFilms, this._onDataChange, this._onViewChange);

      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButton);
      }
    });
  }

  _onSortTypeChange(sortType) {
    const sortedFilms = getSortedTasks(this._films, sortType, 0, this._showingCardCount);

    this._filmsListContainerElement.innerHTML = ``;

    const newFilms = renderFilmCard(this._filmsListContainerElement, sortedFilms, this._onDataChange, this._onViewChange);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    this._renderShowMoreButton();
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }
  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }

}
