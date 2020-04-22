import {createFilmMostCommentedContainerTemplate} from '../templates/film-most-commented.js';
import AbstructComponent from './abstract-component.js';


export default class FilmMostCommented extends AbstructComponent {
  getTemplate() {
    return createFilmMostCommentedContainerTemplate();
  }
}
