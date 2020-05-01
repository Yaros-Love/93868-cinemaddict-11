import {createFilmTopRatedContainerTemplate} from '../templates/film-top-raited.js';
import AbstractComponent from './abstract-component.js';


export default class FilmTopRated extends AbstractComponent {
  getTemplate() {
    return createFilmTopRatedContainerTemplate();
  }
}
