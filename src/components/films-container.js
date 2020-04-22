import {createFilmsContainerTemplate} from '../templates/films-container.js';
import AbstructComponent from './abstract-component.js';


export default class FilmsContainer extends AbstructComponent {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
