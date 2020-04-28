import {createFilmsContainerTemplate} from '../templates/films-container.js';
import AbstractComponent from './abstract-component.js';


export default class FilmsContainer extends AbstractComponent {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
