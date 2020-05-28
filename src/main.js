import API from './api.js';
import ProfileComponent from './components/profile.js';
import FooterStatComponent from './components/statistics.js';
import {render} from './utils/render.js';
import PageController from './controllers/page-controller.js';
import MoviesModel from './models/movies.js';
import LoadingComponent from "./components/loading-component";
import {remove} from "./utils/render";
import StatComponent from "./components/stats";

const AUTHORIZATION = `Basic eo0w59075hf7ik29889a=`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();
const loadingComponent = new LoadingComponent();
const profileComponent = new ProfileComponent(moviesModel);
const pageController = new PageController(mainElement, moviesModel, api);

render(headerElement, profileComponent);
render(mainElement, loadingComponent);

let statisticComponent = null;
mainElement.addEventListener(`click`, (evt) => {
  const button = evt.target.closest(`.main-navigation__additional, .main-navigation__item`);

  if (!button) {
    return;
  }

  if (button.classList.contains(`main-navigation__additional`)) {
    pageController.hide();
    if (statisticComponent) {
      remove(statisticComponent);
    }
    statisticComponent = new StatComponent(moviesModel);
    render(mainElement, statisticComponent);
  } else if (button.classList.contains(`main-navigation__item`)) {
    if (statisticComponent) {
      remove(statisticComponent);
    }
    pageController.show();
  }
});


api.getFilms()
  .then((movies) => {
    remove(loadingComponent);
    moviesModel.setFilms(movies);
    profileComponent.rerender();
    pageController.render();
    render(footerStatisticsElement, new FooterStatComponent(movies));
  })
  .catch(() => {
    remove(loadingComponent);
    moviesModel.setFilms([]);
    profileComponent.rerender();
    pageController.render();
  });
