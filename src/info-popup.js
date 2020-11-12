import MoreInfoView from './components/more_info.js';
import LocalCommentView from './components/local_comments.js';
import {renderElement, RenderPosition} from "./util.js";
import {films} from "./main.js";
import {ESC_KEY_CODE, COMMENTS_COUNT} from "./const.js";

const footerElement = document.querySelector(`.footer`);

export const clickMoreInfoHandler = (evt) => {
  if (!document.querySelector(`.film-details`)) {
    const film = films[evt.target.parentElement.id];
    const moreInfoComponent = new MoreInfoView(film);
    renderElement(footerElement, moreInfoComponent.getElement(), RenderPosition.BEFOREEND);

    const localCommentsContainer = moreInfoComponent.getElement().querySelector(`.film-details__comments-list`);

    // render local comments in popup
    for (let i = 0; i < COMMENTS_COUNT; i++) {
      renderElement(localCommentsContainer, new LocalCommentView(film).getElement(), RenderPosition.BEFOREEND);
    }

    // close-popup listeneners
    const closeByEsc = (evt) => {
    // eslint-disable-next-line no-unused-expressions
      evt.keyCode === ESC_KEY_CODE ? moreInfoComponent.getElement().remove() && moreInfoComponent.removeElement() : false;

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
