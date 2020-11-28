import HeaderProfileComponenet from './components/header-profile.js';
import NavMenuComponent from './components/nav-menu.js';
import TotalFilmsComponent from './components/total-films.js';
import PageController from './controllers/page.js';
import {generateFilms} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import {render, RenderPosition} from './utils/render.js';
import {CARD_COUNT} from './const.js';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatElement = document.querySelector(`.footer__statistics`);

export const films = generateFilms(CARD_COUNT);
const filters = generateFilters();

render(headerElement, new HeaderProfileComponenet(), RenderPosition.BEFOREEND);
render(mainElement, new NavMenuComponent(filters), RenderPosition.BEFOREEND);

const pageController = new PageController();

pageController.render(films);
render(footerStatElement, new TotalFilmsComponent(), RenderPosition.BEFOREEND);

