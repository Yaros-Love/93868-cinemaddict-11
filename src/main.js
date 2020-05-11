import ProfileComponent from './components/profile.js';
import FooterStatComponent from './components/statistics.js';
import {ALL_FILMS_COUNT} from './const.js';
import {generateFilms} from './mock/film.js';
import {getRandomIntegerNumber} from './utils/common.js';
import {render} from './utils/render.js';
import PageController from './controllers/page-controller.js';
import MoviesModel from './models/movies.js';


const profileRating = getRandomIntegerNumber(0, 35);
const headerElement = document.querySelector(`.header`);
render(headerElement, new ProfileComponent(profileRating));

const mainElement = document.querySelector(`.main`);
const films = generateFilms(ALL_FILMS_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setFilms(films);
console.log(moviesModel.getFilms());

const pageController = new PageController(mainElement, moviesModel);
pageController.render(films);

const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
const moviesCount = getRandomIntegerNumber(100000, 150000);

render(footerStatisticsElement, new FooterStatComponent(moviesCount));
