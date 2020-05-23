import API from './api.js';
import ProfileComponent from './components/profile.js';
import FooterStatComponent from './components/statistics.js';
import {render} from './utils/render.js';
import PageController from './controllers/page-controller.js';
import MoviesModel from './models/movies.js';
import LoadingComponent from "./components/loading-component";
import {remove} from "./utils/render";

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
render(mainElement, loadingComponent)


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
  })
