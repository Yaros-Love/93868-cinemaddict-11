import {createButtonShowMoreTemplate} from './../templates/button-show-more.js';
import AbstractComponent from './abstract-component.js';


export default class ButtonShowMore extends AbstractComponent {
  getTemplate() {
    return createButtonShowMoreTemplate();
  }
}
