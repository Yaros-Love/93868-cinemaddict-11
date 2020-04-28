import {createFilmMostCommentedContainerTemplate} from '../templates/film-most-commented.js';
import AbstractComponent from './abstract-component.js';


export default class FilmMostCommented extends AbstractComponent {
  getTemplate() {
    return createFilmMostCommentedContainerTemplate();
  }
}
