import {createSortTemplate} from '../templates/sort.js';
import AbstructComponent from './abstract-component.js';

export default class Sort extends AbstructComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
