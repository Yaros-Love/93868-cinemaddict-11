import {createShowMoreButtonTemplate} from '../templates/show_more-button.js';
import AbstractComponent from './abstract-component.js';

export default class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
