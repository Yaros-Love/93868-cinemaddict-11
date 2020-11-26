import {createSortTemplate} from '../templates/sort-menu.js';
import AbstractComponent from './abstract-component.js';

export default class Sort extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
