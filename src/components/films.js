import {createFilmsTemplate} from './../templates/films.js';
import AbstractComponent from './abstract-component.js';


export default class Films extends AbstractComponent {
  getTemplate() {
    return createFilmsTemplate();
  }
}
