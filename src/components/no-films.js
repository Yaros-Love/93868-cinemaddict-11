import {createNoFilmsTemplate} from './../templates/no-films.js';
import AbstructComponent from './abstract-component.js';

export default class ButtonShowMore extends AbstructComponent {
  getTemplate() {
    return createNoFilmsTemplate();
  }
}


