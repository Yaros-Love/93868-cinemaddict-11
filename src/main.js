import { createProfileTemplate } from './components/profile.js';
import { createMenuTemplate } from './components/menu.js';
import { createSortTemplate } from './components/sort.js';
import { createFilmsTemplate } from './components/films.js';
import { createFilmsContainerTemplate } from './components/films-container.js';
import { createFilmTopRatedContainerTemplate } from './components/film-top-rated.js';
import { createFilmMostCommentedContainerTemplate } from './components/film-most-commented.js';
import { createFilmCardTemplate } from './components/film-card.js';
import { createButtonShowMoreTemplate } from './components/buttton-show-more.js';
import { createFilmDetailsTemplate } from './components/film-details.js';
import { createFooterStatTemplate } from './components/statistics.js';

const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderList = (container, template, count, place = `beforeend`) => {
  for (let i = 0; i < count; i++) {
    render(container, template, place);
  }
};

const headerElement = document.querySelector(`.header`);
render(headerElement, createProfileTemplate());

const mainElement = document.querySelector(`.main`);
render(mainElement, createMenuTemplate());
render(mainElement, createSortTemplate());
render(mainElement, createFilmsTemplate());

const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, createFilmsContainerTemplate());
render(filmsElement, createFilmTopRatedContainerTemplate());
render(filmsElement, createFilmMostCommentedContainerTemplate());

const filmsListContainerElement = filmsElement.querySelector(`.films-list .films-list__container`);
renderList(filmsListContainerElement, createFilmCardTemplate(), CARD_COUNT);
render(filmsListContainerElement, createButtonShowMoreTemplate(), `afterend`);

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);
filmsListExtraElements.forEach((container) => {
  renderList(container, createFilmCardTemplate(), EXTRA_CARD_COUNT);
});

const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, createFooterStatTemplate());
render(footerElement, createFilmDetailsTemplate(), `afterend`);

const popupDetailsElement = document.querySelector(`.film-details`);
popupDetailsElement.style.display = `none`;
