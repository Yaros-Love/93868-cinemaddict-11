import {createElement} from './../utils.js';

const createFilmMostCommentedContainerTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmMostCommented {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmMostCommentedContainerTemplate();
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
