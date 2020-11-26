import {createHeaderProfileTemplate} from '../templates/header-profile.js';
import AbstractComponent from './abstract-component.js';

export default class HeaderProfile extends AbstractComponent {
  getTemplate() {
    return createHeaderProfileTemplate();
  }
}

