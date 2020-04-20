import {createElement} from './../utils.js';
import {createProfileTemplate} from './../templates/profile.js';


export default class Profile {
  constructor(rating) {
    this._rating = rating;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._rating);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
