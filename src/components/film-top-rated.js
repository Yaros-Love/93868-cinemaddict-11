import {createFilmTopRatedContainerTemplate} from '../templates/film-top-raited.js';
import AbstructComponent from './abstract-component.js';


export default class FilmTopRated extends AbstructComponent {
  getTemplate() {
    return createFilmTopRatedContainerTemplate();
  }
}
