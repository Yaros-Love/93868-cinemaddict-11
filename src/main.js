import ProfileComponent from './components/profile.js';
import MenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import FilmsComponent from './components/films.js';
import FilmsContainerComponent from './components/films-container.js';
import FilmTopRatedContainerComponent from './components/film-top-rated.js';
import FilmMostCommentedContainerComponent from './components/film-most-commented.js';
import FilmCardComponent from './components/film-card.js';
import NoFilmComponent from './components/no-films.js';
import ButtonShowMoreComponent from './components/buttton-show-more.js';
import FilmDetailsComponent from './components/film-details.js';
import FooterStatComponent from './components/statistics.js';
import {ALL_FILMS_COUNT} from './const.js';
import {generateFilms} from './mock/film.js';
import {getFilters} from './mock/filter.js';
import {getRandomIntegerNumber, render, RenderPosition} from './utils.js';


const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const renderFilmCard = (filmListElement, film) => {

  const openFilmPopup = () => {
    render(footerElement, filmDetailsComponent.getElement(), `afterend`);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closeFilmPopup = () => {
    document.querySelector(`body`).removeChild(filmDetailsComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closeFilmPopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmComponent = new FilmCardComponent(film);
  const filmCardPosterElement = filmComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitleElement = filmComponent.getElement().querySelector(`.film-card__title`);
  const filmCommentsElement = filmComponent.getElement().querySelector(`.film-card__comments`);

  filmCardPosterElement.addEventListener(`click`, openFilmPopup);
  filmTitleElement.addEventListener(`click`, openFilmPopup);
  filmCommentsElement.addEventListener(`click`, openFilmPopup);


  const filmDetailsComponent = new FilmDetailsComponent(film);
  const closePopupButton = filmDetailsComponent.getElement().querySelector(`.film-details .film-details__close-btn`);

  closePopupButton.addEventListener(`click`, closeFilmPopup);

  render(filmListElement, filmComponent.getElement());
};

const renderFilmsLists = (filmsComponent, films) => {
  if (!films.length) {
    render(filmsComponent.getElement(), new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);
    render(filmsComponent.getElement(), new NoFilmComponent().getElement(), RenderPosition.BEFOREEND);

    return;
  }


  render(filmsComponent.getElement(), new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);
  render(filmsComponent.getElement(), new FilmTopRatedContainerComponent().getElement(), RenderPosition.BEFOREEND);
  render(filmsComponent.getElement(), new FilmMostCommentedContainerComponent().getElement(), RenderPosition.BEFOREEND);

  const filmListElement = filmsComponent.getElement().querySelector(`.films-list`);
  const filmsListContainerElement = filmsComponent.getElement().querySelector(`.films-list__container`);

  let showingFilmsCount = CARD_COUNT;

  films
    .slice(0, showingFilmsCount)
    .forEach((film) => {
      renderFilmCard(filmsListContainerElement, film);
    });

  render(filmListElement, new ButtonShowMoreComponent().getElement(), `beforeend`);

  const showMoreButton = filmListElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + CARD_COUNT;

    films.slice(prevFilmCount, showingFilmsCount)
      .forEach((film) => renderFilmCard(filmsListContainerElement, film));
    if (showingFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });

  const filmsListExtraElements = filmsComponent.getElement().querySelectorAll(`.films-list--extra .films-list__container`);

  filmsListExtraElements.forEach((container) => {
    films
      .slice(0, EXTRA_CARD_COUNT)
      .forEach((film) => {
        renderFilmCard(container, film);
      });
  });
};

const profileRating = getRandomIntegerNumber(0, 35);
const headerElement = document.querySelector(`.header`);
render(headerElement, new ProfileComponent(profileRating).getElement());

const filters = getFilters();
const films = generateFilms(ALL_FILMS_COUNT);
// для теста с пустыми данными
// const films = [];

const mainElement = document.querySelector(`.main`);

render(mainElement, new MenuComponent(filters).getElement());
render(mainElement, new SortComponent().getElement());

const filmsComponent = new FilmsComponent();

render(mainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);
renderFilmsLists(filmsComponent, films);

const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
const moviesCount = getRandomIntegerNumber(100000, 150000);

render(footerStatisticsElement, new FooterStatComponent(moviesCount).getElement());
