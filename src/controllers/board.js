import BoardComponent from '../components/board.js';
import FilmsContainerComponent from '../components/film_list-container.js';
import CardFilmComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show_more-button.js';
import ExtraBoardComponent from '../components/film_list_extra-container.js';
import {moreInfoClickHandler} from "../info-popup.js";
import {render, remove, RenderPosition} from '../utils/render.js';
import {EXTRA_BOARD_TYTLES, SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON} from '../const.js';

const mainElement = document.querySelector(`.main`);

const renderFilmCard = (container, film, handler) => {
  const cardFilmComponent = new CardFilmComponent(film);
  render(container, cardFilmComponent, RenderPosition.BEFOREEND);
  cardFilmComponent.setCardClickHandler(handler);
};

export default class BoardController {
  constructor() {
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._extraFilmsContaunerComponent = new ExtraBoardComponent();
    this._extraBoardRatedComponent = new ExtraBoardComponent(EXTRA_BOARD_TYTLES[0]);
    this._extraBoardRecommendedComponent = new ExtraBoardComponent(EXTRA_BOARD_TYTLES[1]);
  }

  render(films) {
    const Board = new BoardComponent(films);

    render(mainElement, Board, RenderPosition.BEFOREEND);

    if (films) {
      const filmListElement = Board.getElement().querySelector(`.films-list`);
      // const this._filmsContainerComponent = new FilmsContainerComponent();

      render(filmListElement, this._filmsContainerComponent, RenderPosition.BEFOREEND);

      for (let i = 0; i < SHOWING_TASKS_COUNT_ON_START; i++) {
        renderFilmCard(this._filmsContainerComponent.getElement(), films[i], moreInfoClickHandler);
      }

      render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

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

      // show more films by load-more_button
      let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        films.slice(prevTasksCount, showingTasksCount)
        .forEach((film) => renderFilmCard(this._filmsContainerComponent.getElement(), film, moreInfoClickHandler));

        if (showingTasksCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    }
  }
}
