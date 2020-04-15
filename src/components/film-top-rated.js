import {createElement} from './../utils.js';

const createFilmTopRatedContainerTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmTopRated {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmTopRatedContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      return createElement(this.getTemplate());
    }

    return createElement(this.getTemplate());
  }

  removeElement() {
    this._element = null;
  }
}
