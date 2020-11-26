import {createFilmListContainerTemplate} from '../templates/film_list-container';
import AbstractComponent from './abstract-component.js';

export default class FilmListContainer extends AbstractComponent {
  getTemplate() {
    return createFilmListContainerTemplate();
  }
}
