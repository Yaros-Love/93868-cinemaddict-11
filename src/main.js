import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import FilmsComponent from './components/films.js';
import FilmsContainerComponent from './components/films-container.js';
import FilmTopRatedContainerComponent from './components/film-top-rated.js';
import FilmMostCommentedContainerComponent from './components/film-most-commented.js';
import FilmCardComponent from './components/film-card.js';
import ButtonShowMoreComponent from './components/buttton-show-more.js';
import FilmDetailsComponent from './components/film-details.js';
import FooterStatComponent from './components/statistics.js';
import {ALL_FILMS_COUNT} from './const.js';
import {generateFilms} from './mock/film.js';
import {getFilters} from './mock/filter.js';
import {getRandomIntegerNumber, render} from './utils.js';


const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const renderFilmsLists = (filmsComponent, films) => {
  render(filmsComponent.getElement(), new FilmsContainerComponent().getElement());
  render(filmsComponent.getElement(), new FilmTopRatedContainerComponent().getElement());
  render(filmsComponent.getElement(), new FilmMostCommentedContainerComponent().getElement());

  const filmsListContainerElement = filmsComponent.getElement().querySelector(`.films-list .films-list__container`);
  let showingFilmsCount = CARD_COUNT;

  films
    .slice(0, showingFilmsCount)
    .forEach((film) => {
      render(filmsListContainerElement, new FilmCardComponent(film).getElement());
    });


  const filmsListExtraElements = filmsComponent.getElement().querySelectorAll(`.films-list--extra .films-list__container`);

  filmsListExtraElements.forEach((container) => {
    films
      .slice(0, EXTRA_CARD_COUNT)
      .forEach((film) => {
        render(container, new FilmCardComponent(film).getElement());
      });
  });
};

const profileRating = getRandomIntegerNumber(0, 35);
const headerElement = document.querySelector(`.header`);
render(headerElement, new ProfileComponent(profileRating).getElement());

const filters = getFilters();

const mainElement = document.querySelector(`.main`);

render(mainElement, new MenuComponent(filters).getElement());
render(mainElement, new SortComponent().getElement());

const filmsComponent = new FilmsComponent()
render(mainElement, filmsComponent.getElement());


const films = generateFilms(ALL_FILMS_COUNT);
console.log(films);


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

const renderedFilmsCard = filmsElement.querySelectorAll(`.film-card`);

renderedFilmsCard.forEach((card, i) => {
  card.addEventListener(`click`, () => {
    render(footerElement, createFilmDetailsTemplate(films[i]), `afterend`);
    const closePopupButton = document.querySelector(`.film-details .film-details__close-btn`);
    closePopupButton.addEventListener(`click`, () => {
      const popupDetailsElement = document.querySelector(`.film-details`);
      popupDetailsElement.remove();
    });
  });
});
