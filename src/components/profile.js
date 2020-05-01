import {createProfileTemplate} from './../templates/profile.js';
import AbstractComponent from './abstract-component.js';


export default class Profile extends AbstractComponent {
  constructor(rating) {
    super();
    this._rating = rating;
  }

  getTemplate() {
    return createProfileTemplate(this._rating);
  }
}
