import {createProfileTemplate} from '../templates/profile.js';
import AbstractSmartComponent from "./abstract-smart-component";
import {getFilmsByFilter} from "../utils/filter";
import {ProfileRatingRules, FilterType} from "../const";


export default class Profile extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();
    this._films = moviesModel;
  }

  getProfileRating() {
    const films = this._films.getFilmsAll();
    const watchedFilmsCount = getFilmsByFilter(films, FilterType.HISTORY).length;

    const ratingRule = ProfileRatingRules.find((rule) => {
      return rule.from <= watchedFilmsCount && watchedFilmsCount <= rule.to;
    });

    return ratingRule.rating;

  }

  recoveryListeners() {
    this.getProfileRating();
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createProfileTemplate(this.getProfileRating());
  }
}
