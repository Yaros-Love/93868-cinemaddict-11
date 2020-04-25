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

const renderFilmCard = (filmListElement, film) => {

  const openFilmPopup = () => {
    const footerElement = document.querySelector(`.footer`);
    render(footerElement, filmDetailsComponent, RenderPosition.AFTEREND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closeFilmPopup = () => {
    document.querySelector(`body`).removeChild(filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeFilmPopup();
    }
  };

  const filmComponent = new FilmCardComponent(film);
  filmComponent.setCardClickHandler(openFilmPopup);

  const filmDetailsComponent = new FilmDetailsComponent(film);
  filmDetailsComponent.setCloseButtonClickHandler(closeFilmPopup);

  render(filmListElement, filmComponent);
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

    this._sortComponent = new SortComponent();
    this._filmsComponent = new FilmsComponent();

    this._filmsContainerComponent = new FilmsContainerComponent();
    this._noFilmComponent = new NoFilmComponent();
    this._filmTopRatedContainerComponent = new FilmTopRatedContainerComponent();
    this._filmMostCommentedContainerComponent = new FilmMostCommentedContainerComponent();
    this._showMoreButton = new ButtonShowMoreComponent();
  }

  render(films) {
    const container = this._container;
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
      films
        .slice(0, EXTRA_CARD_COUNT)
        .forEach((film) => {
          renderFilmCard(box, film);
        });
    });


    const filmListElement = filmsElement.querySelector(`.films-list`);
    const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

    let showingFilmsCount = CARD_COUNT;

    films
      .slice(0, showingFilmsCount)
      .forEach((film) => {
        renderFilmCard(filmsListContainerElement, film);
      });

    const showMoreButton = this._showMoreButton;
    render(filmListElement, showMoreButton);

    showMoreButton.setClickHandler(() => {
      const prevFilmCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + CARD_COUNT;

      films.slice(prevFilmCount, showingFilmsCount)
        .forEach((film) => renderFilmCard(filmsListContainerElement, film));
      if (showingFilmsCount >= films.length) {
        remove(showMoreButton);
      }
    });

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const showingCardCount = CARD_COUNT;
      const filmsContainerElement = this._filmsContainerComponent.getElement().querySelector(`.films-list__container`);

      const sortedFilms = getSortedTasks(films, sortType, 0, showingCardCount);
      filmsContainerElement.innerHTML = ``;

      sortedFilms.slice(0, showingCardCount)
        .forEach((film) => {
          renderFilmCard(filmsContainerElement, film);
        });

      render(filmListElement, showMoreButton);
    });
  }
}
