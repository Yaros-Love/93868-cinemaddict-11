import {createProfileTemplate} from './../templates/profile.js';
import AbstructComponent from './abstract-component.js';


export default class Profile extends AbstructComponent {
  constructor(rating) {
    super();
    this._rating = rating;
  }

  getTemplate() {
    return createProfileTemplate(this._rating);
  }

  getElement() {
  }
}
