import {createFilmsTemplate} from './../templates/films.js';
import AbstructComponent from './abstract-component.js';


export default class Films extends AbstructComponent {
  getTemplate() {
    return createFilmsTemplate();
  }
}
