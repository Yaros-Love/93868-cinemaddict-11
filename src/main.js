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
import {render, RenderPosition} from './util.js';
import {EXTRA_CONTAINER_TYTLES, CARD_COUNT, EXTRA_CARDS_COUNT, SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON} from './const.js';

export const films = generateFilms(CARD_COUNT);
const filters = generateFilters();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatElement = document.querySelector(`.footer__statistics`);

render(headerElement, new HeaderProfileView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new NavMenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const renderBoard = (data) => {
  const Board = new BoardView(data).getElement();

  render(mainElement, Board, RenderPosition.BEFOREEND);

  if (data) {
    const filmListElement = Board.querySelector(`.films-list`);
    const FilmListContainer = new FilmsContainerView().getElement();

    render(filmListElement, FilmListContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < SHOWING_TASKS_COUNT_ON_START; i++) {
      render(FilmListContainer, new CardFilmView(data[i]).getElement(), RenderPosition.BEFOREEND);
    }

    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    EXTRA_CONTAINER_TYTLES
      .map((item) => render(Board, new ExtraFilmContainerView(item).getElement(), RenderPosition.BEFOREEND));

    const topRatedContainer = document.querySelector(`.top-rated`);
    const mostCommentedContaier = document.querySelector(`.most-commented`);

    // render most rated and commented films
    const mostRatedFilms = data.slice().sort((a, b) => {
      return b.rating - a.rating;
    });

    const mostCommentedFilms = data.slice().sort((a, b) => {
      return b.comments - a.comments;
    });

    for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
      render(topRatedContainer, new CardFilmView(mostRatedFilms[i]).getElement(), RenderPosition.BEFOREEND);
      render(mostCommentedContaier, new CardFilmView(mostCommentedFilms[i]).getElement(), RenderPosition.BEFOREEND);
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

      films.slice(prevTasksCount, showingTasksCount)
        .forEach((film) => render(FilmListContainer, new CardFilmView(film).getElement(), RenderPosition.BEFOREEND));

      if (showingTasksCount >= films.length) {
        loadMoreButton.remove();
      }
    });


  }


  // if (data.length <= 0) {
  //   render(mainElement, new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
  // } else {
  //   const filmsElement = new BoardView().getElement();

  //   render(mainElement, filmsElement, RenderPosition.BEFOREEND);

  //   const filmListElement = filmsElement.querySelector(`.films-list`);
  //   const filmListContainer = filmListElement.querySelector(`.films-list__container`);

  //   for (let i = 0; i < SHOWING_TASKS_COUNT_ON_START; i++) {
  //     render(filmListContainer, new CardFilmView(data[i]).getElement(), RenderPosition.BEFOREEND);
  //   }

  //   const showMoreButtonComponent = new ShowMoreButtonView();
  //   render(filmListElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  //   EXTRA_CONTAINER_TYTLES
  //     .map((item) => render(filmsElement, new ExtraFilmContainerView(item).getElement(), RenderPosition.BEFOREEND));

  //   const topRatedContainer = document.querySelector(`.top-rated`);
  //   const mostCommentedContaier = document.querySelector(`.most-commented`);

  //   // render most rated and commented films
  //   const mostRatedFilms = data.slice().sort((a, b) => {
  //     return b.rating - a.rating;
  //   });

  //   const mostCommentedFilms = data.slice().sort((a, b) => {
  //     return b.comments - a.comments;
  //   });

  //   for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
  //     render(topRatedContainer, new CardFilmView(mostRatedFilms[i]).getElement(), RenderPosition.BEFOREEND);
  //     render(mostCommentedContaier, new CardFilmView(mostCommentedFilms[i]).getElement(), RenderPosition.BEFOREEND);
  //   }

  //   //  listeners for posters, titles, comments; open popup with exta information.
  //   const filmCardPosters = document.querySelectorAll(`.film-card__poster`);
  //   const filmCardTitles = document.querySelectorAll(`.film-card__title`);
  //   const filmCardComments = document.querySelectorAll(`.film-card__comments`);

  //   filmCardPosters.forEach((it) => {
  //     it.addEventListener(`click`, clickMoreInfoHandler);
  //   });
  //   filmCardTitles.forEach((it) => {
  //     it.addEventListener(`click`, clickMoreInfoHandler);
  //   });
  //   filmCardComments.forEach((it) => {
  //     it.addEventListener(`click`, clickMoreInfoHandler);
  //   });

  //   // show more films by load-more_button
  //   let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

  //   const loadMoreButton = document.querySelector(`.films-list__show-more`);

  //   loadMoreButton.addEventListener(`click`, () => {
  //     const prevTasksCount = showingTasksCount;
  //     showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  //     films.slice(prevTasksCount, showingTasksCount)
  //       .forEach((film) => render(filmListContainer, new CardFilmView(film).getElement(), RenderPosition.BEFOREEND));

  //     if (showingTasksCount >= films.length) {
  //       loadMoreButton.remove();
  //     }
  //   });
};

renderBoard(films);
render(footerStatElement, new TotalFilmsView().getElement(), RenderPosition.BEFOREEND);

