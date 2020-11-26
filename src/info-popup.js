import MoreInfoView from './components/more_info.js';
import LocalCommentView from './components/local_comments.js';
import {render, RenderPosition} from './utils/render.js';
import {films} from "./main.js";
import {ESC_KEY_CODE, COMMENTS_COUNT} from './const.js';

const footerElement = document.querySelector(`.footer`);

export const clickMoreInfoHandler = (evt) => {
  if (!document.querySelector(`.film-details`)) {
    const film = films[evt.target.parentElement.id];
    const moreInfoComponent = new MoreInfoView(film);
    render(footerElement, moreInfoComponent, RenderPosition.BEFOREEND);

    const localCommentsContainer = moreInfoComponent.getElement().querySelector(`.film-details__comments-list`);

    // render local comments in popup
    for (let i = 0; i < COMMENTS_COUNT; i++) {
      render(localCommentsContainer, new LocalCommentView(film), RenderPosition.BEFOREEND);
    }

    // close-popup listeneners
    const closeByEsc = (e) => {
      if (e.keyCode === ESC_KEY_CODE) {
        moreInfoComponent.getElement().remove();
        moreInfoComponent.removeElement();
      }

      document.removeEventListener(`keydown`, closeByEsc);
    };

    const closeButElem = moreInfoComponent.getElement().querySelector(`.film-details__close-btn`);
    closeButElem.addEventListener(`click`, () => {
      moreInfoComponent.getElement().remove();
      moreInfoComponent.removeElement();
    });

    document.addEventListener(`keydown`, closeByEsc);
  }
};
