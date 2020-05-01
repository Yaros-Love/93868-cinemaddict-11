import {createNoFilmsTemplate} from './../templates/no-films.js';
import AbstractComponent from './abstract-component.js';

export default class ButtonShowMore extends AbstractComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}


