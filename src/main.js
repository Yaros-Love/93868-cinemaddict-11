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
import { ALL_FILMS_COUNT } from './const.js';
import { generateFilms } from './mock/film.js'
import { getFilters } from './mock/filter.js';
import { getRandomIntegerNumber } from './utils.js';


const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const profileRating = getRandomIntegerNumber(0, 35);
const headerElement = document.querySelector(`.header`);
render(headerElement, createProfileTemplate(profileRating));

const filters = getFilters();

const mainElement = document.querySelector(`.main`);

render(mainElement, createMenuTemplate(filters));
render(mainElement, createSortTemplate());
render(mainElement, createFilmsTemplate());

const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, createFilmsContainerTemplate());
render(filmsElement, createFilmTopRatedContainerTemplate());
render(filmsElement, createFilmMostCommentedContainerTemplate());

const filmsListContainerElement = filmsElement.querySelector(`.films-list .films-list__container`);

const films = generateFilms(ALL_FILMS_COUNT);
console.log(films);

let showingFilmsCount = CARD_COUNT;

films
  .slice(0, showingFilmsCount)
  .forEach((film) => {
  render(filmsListContainerElement, createFilmCardTemplate(film))
});
render(filmsListContainerElement, createButtonShowMoreTemplate(), `afterend`);

const showMoreButton = filmsElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevFilmCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + CARD_COUNT;

  films.slice(prevFilmCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`));
  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});


const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);
filmsListExtraElements.forEach((container) => {
  films
    .slice(0, EXTRA_CARD_COUNT)
    .forEach((film) => {
      render(container, createFilmCardTemplate(film));
    });
});

const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
const moviesCount = getRandomIntegerNumber(100000, 150000);

render(footerStatisticsElement, createFooterStatTemplate(moviesCount));
render(footerElement, createFilmDetailsTemplate(), `afterend`);

const popupDetailsElement = document.querySelector(`.film-details`);
popupDetailsElement.style.display = `none`;
