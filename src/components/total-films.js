import {createCountFilmsTemplate} from '../templates/total-films.js';
import AbstractComponent from './abstract-component.js';

export default class TotalFilms extends AbstractComponent {
  getTemplate() {
    return createCountFilmsTemplate();
  }
}

