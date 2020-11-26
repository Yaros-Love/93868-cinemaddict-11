import HeaderProfileView from './components/header-profile.js';
import NavMenuView from './components/nav-menu.js';
import SortView from './components/sort-menu.js';
import BoardView from './components/board.js';
import FilmsContainerView from './components/film_list-container.js';
import CardFilmView from './components/film-card.js';
import ShowMoreButtonView from './components/show_more-button.js';
import ExtraFilmContainerView from './components/film_list_extra-container.js';
import TotalFilmsView from './components/total-films.js';
import {clickMoreInfoHandler} from "./info-popup.js";
import {generateFilms} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import {render, RenderPosition} from './utils/render.js';
import {EXTRA_CONTAINER_TYTLES, CARD_COUNT, EXTRA_CARDS_COUNT, SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON} from './const.js';

export const films = generateFilms(CARD_COUNT);
const filters = generateFilters();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatElement = document.querySelector(`.footer__statistics`);

render(headerElement, new HeaderProfileView(), RenderPosition.BEFOREEND);
render(mainElement, new NavMenuView(filters), RenderPosition.BEFOREEND);
render(mainElement, new SortView(), RenderPosition.BEFOREEND);

// eslint-disable-next-line no-shadow
const renderBoard = (filmsArray) => {
  const Board = new BoardView(filmsArray);

  render(mainElement, Board, RenderPosition.BEFOREEND);

  if (filmsArray) {
    const filmListElement = Board.getElement().querySelector(`.films-list`);
    const FilmListContainer = new FilmsContainerView();

    render(filmListElement, FilmListContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < SHOWING_TASKS_COUNT_ON_START; i++) {
      render(FilmListContainer.getElement(), new CardFilmView(filmsArray[i]), RenderPosition.BEFOREEND);
    }

    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmListElement, showMoreButtonComponent, RenderPosition.BEFOREEND);

    EXTRA_CONTAINER_TYTLES
      .map((item) => render(Board.getElement(), new ExtraFilmContainerView(item), RenderPosition.BEFOREEND));

    const topRatedContainer = document.querySelector(`.top-rated`);
    const mostCommentedContaier = document.querySelector(`.most-commented`);

    // render most rated and commented films
    const mostRatedFilms = filmsArray.slice().sort((a, b) => {
      return b.rating - a.rating;
    });

    const mostCommentedFilms = filmsArray.slice().sort((a, b) => {
      return b.comments - a.comments;
    });

    for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
      render(topRatedContainer, new CardFilmView(mostRatedFilms[i]), RenderPosition.BEFOREEND);
      render(mostCommentedContaier, new CardFilmView(mostCommentedFilms[i]), RenderPosition.BEFOREEND);
    }

    //  listeners for posters, titles, comments; open popup with exta information.
    const filmCardPosters = document.querySelectorAll(`.film-card__poster`);
    const filmCardTitles = document.querySelectorAll(`.film-card__title`);
    const filmCardComments = document.querySelectorAll(`.film-card__comments`);

    filmCardPosters.forEach((it) => {
      it.addEventListener(`click`, clickMoreInfoHandler);
    });
    filmCardTitles.forEach((it) => {
      it.addEventListener(`click`, clickMoreInfoHandler);
    });
    filmCardComments.forEach((it) => {
      it.addEventListener(`click`, clickMoreInfoHandler);
    });

    // show more films by load-more_button
    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    const loadMoreButton = document.querySelector(`.films-list__show-more`);

    loadMoreButton.addEventListener(`click`, () => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      filmsArray.slice(prevTasksCount, showingTasksCount)
        .forEach((film) => render(FilmListContainer.getElement(), new CardFilmView(film), RenderPosition.BEFOREEND));

      if (showingTasksCount >= filmsArray.length) {
        loadMoreButton.remove();
      }
    });
  }
};

renderBoard(films);
render(footerStatElement, new TotalFilmsView(), RenderPosition.BEFOREEND);

