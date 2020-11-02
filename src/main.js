/* eslint-disable no-console */
import { createHeaderProfileTemplate } from "./components/header-profile.js";
import { createNavMenuTemplate } from "./components/nav-menu.js";
import { createSortTemplate } from "./components/sort-menu.js";
import { createFilmListContainerTemplate } from "./components/film_list-container.js";
import { createFilmCardTemplate } from "./components/film-card.js";
import { createShowMoreButton } from "./components/show_more-button.js";
import { createFilmsListExtraTemplate } from "./components/film_list_extra-container.js";
import { createCountFilmsTemplate } from "./components/count_films-element.js";
import { cardClickHandler } from "./info-popup.js";
import { generateCards } from "./mock/film.js";
import { generateFilters } from "./mock/filter.js";

const CARD_COUNT = 20;
const EXTRA_CARDS_COUNT = 2;
const SHOWING_TASKS_COUNT_ON_START = 10;
const SHOWING_TASKS_COUNT_BY_BUTTON = 10;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatElement = document.querySelector(`.footer__statistics`);

// markup for extra containers
const extraListContainers = [{
  title: `Top rated`,
  class: `top-rated`
}, {
  title: `Most commented`,
  class: `most-commented`
}];

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const cards = generateCards(CARD_COUNT);
const filters = generateFilters();

render(headerElement, createHeaderProfileTemplate(), `beforeend`);
render(mainElement, createNavMenuTemplate(filters), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createFilmListContainerTemplate(), `beforeend`);

const filmElement = document.querySelector(`.films`);
const filmListElement = document.querySelector(`.films-list`);
const filmListContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < SHOWING_TASKS_COUNT_ON_START; i++) {
  render(filmListContainer, createFilmCardTemplate(cards[i]), `beforeend`);
}

render(filmListElement, createShowMoreButton(), `beforeend`);

render(filmElement, createFilmsListExtraTemplate(extraListContainers), `beforeend`);

const topRatedContainer = document.querySelector(`.top-rated`);
const mostCommentedContaier = document.querySelector(`.most-commented`);

// render most rated and commented films
const mostRatedFilms = cards.slice().sort((a, b) => {
  return b.rating - a.rating;
});

const mostCommentedFilms = cards.slice().sort((a, b) => {
  return b.comments - a.comments;
});

for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
  render(topRatedContainer, createFilmCardTemplate(mostRatedFilms[i]), `beforeend`);
  render(mostCommentedContaier, createFilmCardTemplate(mostCommentedFilms[i]), `beforeend`);
}

render(footerStatElement, createCountFilmsTemplate(), `beforeend`);

//  listeners for posters, titles, comments; open popup with exta information.
const filmCardPosters = document.querySelectorAll(`.film-card__poster`);
const filmCardTitles = document.querySelectorAll(`.film-card__title`);
const filmCardComments = document.querySelectorAll(`.film-card__comments`);

filmCardPosters.forEach((it) => {
  it.addEventListener(`click`, cardClickHandler);
});
filmCardTitles.forEach((it) => {
  it.addEventListener(`click`, cardClickHandler);
});
filmCardComments.forEach((it) => {
  it.addEventListener(`click`, cardClickHandler);
});

// show more films by load-more_button
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

const loadMoreButton = document.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  cards.slice(prevTasksCount, showingTasksCount)
    .forEach((card) => render(filmListContainer, createFilmCardTemplate(card), `beforeend`));

  if (showingTasksCount >= cards.length) {
    loadMoreButton.remove();
  }
});


export { render };
