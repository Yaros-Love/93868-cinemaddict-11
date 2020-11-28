import BoardComponent from '../components/board.js';
import SortComponent from '../components/sort-menu.js';
import FilmsContainerComponent from '../components/film_list-container.js';
import CardFilmComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show_more-button.js';
import ExtraBoardComponent from '../components/film_list_extra-container.js';
import {SortType} from '../templates/sort-menu.js';
import {moreInfoClickHandler} from "../info-popup.js";
import {render, remove, RenderPosition} from '../utils/render.js';
import {EXTRA_BOARD_TYTLES, SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON} from '../const.js';

const mainElement = document.querySelector(`.main`);

const renderFilmCard = (container, film, handler) => {
  const cardFilmComponent = new CardFilmComponent(film);
  render(container, cardFilmComponent, RenderPosition.BEFOREEND);
  cardFilmComponent.setCardClickHandler(handler);
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
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
  constructor() {
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._sortComponent = new SortComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._extraFilmsContaunerComponent = new ExtraBoardComponent();
    this._extraBoardRatedComponent = new ExtraBoardComponent(EXTRA_BOARD_TYTLES[0]);
    this._extraBoardRecommendedComponent = new ExtraBoardComponent(EXTRA_BOARD_TYTLES[1]);
  }

  render(films) {
    render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

    const Board = new BoardComponent(films);

    render(mainElement, Board, RenderPosition.BEFOREEND);

    if (films) {
      const filmListElement = Board.getElement().querySelector(`.films-list`);

      const renderLoadMoreButton = () => {
        if (showingFilmsCount >= films.length) {
          return;
        }

        render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

        this._showMoreButtonComponent.setClickHandler(() => {
          const prevTasksCount = showingFilmsCount;
          showingFilmsCount = showingFilmsCount + SHOWING_TASKS_COUNT_BY_BUTTON;

          const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevTasksCount, showingFilmsCount);

          sortedFilms
          .forEach((film) => renderFilmCard(this._filmsContainerComponent.getElement(), film, moreInfoClickHandler));

          if (showingFilmsCount >= films.length) {
            remove(this._showMoreButtonComponent);
          }
        });
      };

      render(filmListElement, this._filmsContainerComponent, RenderPosition.BEFOREEND);

      let showingFilmsCount = SHOWING_TASKS_COUNT_ON_START;

      for (let i = 0; i < SHOWING_TASKS_COUNT_ON_START; i++) {
        renderFilmCard(this._filmsContainerComponent.getElement(), films[i], moreInfoClickHandler);
      }

      renderLoadMoreButton();

      render(Board.getElement(), this._extraBoardRatedComponent, RenderPosition.BEFOREEND);
      render(Board.getElement(), this._extraBoardRecommendedComponent, RenderPosition.BEFOREEND);

      const topRatedContainer = this._extraBoardRatedComponent.getElement().querySelector(`.top-rated`);
      const mostCommentedContaier = this._extraBoardRecommendedComponent.getElement().querySelector(`.most-commented`);

      // render most rated and commented films
      const mostRatedFilms = films.slice().sort((a, b) => {
        return b.rating - a.rating;
      });

      const mostCommentedFilms = films.slice().sort((a, b) => {
        return b.comments - a.comments;
      });

      mostRatedFilms.slice(0, 2)
      .map((film) => {
        renderFilmCard(topRatedContainer, film, moreInfoClickHandler);
      });

      mostCommentedFilms.slice(0, 2)
      .map((film) => {
        renderFilmCard(mostCommentedContaier, film, moreInfoClickHandler);
      });

      // sort films
      this._sortComponent.setSortTypeChangeHandler((sortType) => {
        showingFilmsCount = SHOWING_TASKS_COUNT_BY_BUTTON;

        const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

        this._filmsContainerComponent.getElement().innerHTML = ``;

        sortedFilms.slice(0, showingFilmsCount)
          .forEach((film) => {
            renderFilmCard(this._filmsContainerComponent.getElement(), film, moreInfoClickHandler);
          });

        renderLoadMoreButton();
      });
    }


  }
}
