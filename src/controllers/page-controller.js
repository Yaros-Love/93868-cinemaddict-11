import FilmsContainerComponent from '../components/films-container.js';
import FilmTopRatedContainerComponent from '../components/film-top-rated.js';
import FilmMostCommentedContainerComponent from '../components/film-most-commented.js';
import MenuComponent from '../components/menu.js';
import SortComponent from '../components/sort.js';
import FilmsComponent from '../components/films.js';
import FilmCardComponent from '../components/film-card.js';
import NoFilmComponent from '../components/no-films.js';
import ButtonShowMoreComponent from '../components/buttton-show-more.js';
import FilmDetailsComponent from '../components/film-details.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {getFilters} from '../mock/filter.js';
import {SortType} from '../templates/sort.js';


const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;


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
    this._showingCardCount = CARD_COUNT;
    this._sortComponent = new SortComponent();
    this._filmsComponent = new FilmsComponent();

    this._filmsContainerComponent = new FilmsContainerComponent();
    this._noFilmComponent = new NoFilmComponent();
    this._filmTopRatedContainerComponent = new FilmTopRatedContainerComponent();
    this._filmMostCommentedContainerComponent = new FilmMostCommentedContainerComponent();
    this._showMoreButton = new ButtonShowMoreComponent();

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._filmListElement = this._container.querySelector(`.films-list`);
    this._filmsListContainerElement = this._container.querySelector(`.films-list__container`);

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

    const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);

    filmsListExtraElements.forEach((box) => {
      this._films
        .slice(0, EXTRA_CARD_COUNT)
        .forEach((film) => {
          renderFilmCard(box, film);
        });
    });

    this._films
      .slice(0, this._showingCardCount)
      .forEach((film) => {
        renderFilmCard(this._filmsListContainerElement, film);
      });
  }

  _renderShowMoreButton() {
    if (this._showingCardCount >= this._films.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._showMoreButton);

    this._showMoreButton.setClickHandler(() => {
      const prevFilmCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + CARD_COUNT;

      this._films.slice(prevFilmCount, this._showingFilmsCount)
        .forEach((film) => renderFilmCard(this._filmsListContainerElement, film));

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButton);
      }
    });
  }

  onSortTypeChange(sortType) {
    const sortedFilms = getSortedTasks(this._films, sortType, 0, this._showingCardCount);

    this._filmsListContainerElement.innerHTML = ``;

    sortedFilms.slice(0, this._showingCardCount)
      .forEach((film) => {
        renderFilmCard(this._filmsListContainerElement, film);
      });

    this._renderShowMoreButton();
  }
}
