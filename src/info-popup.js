import { render } from "./main.js";
import { createMoreInfoTemplate } from "./components/more_info.js";
import {createLocalComments} from "./components/local_comments.js";
import {cards} from "./main.js";
import {ESC_KEY_CODE} from "./const.js";

const COMMENTS_COUNT = 4;

const footerElement = document.querySelector(`.footer`);

//  close by esc press
const closeByEsc = (evt) => {
  let filmDetailsElem = document.querySelector(`.film-details`);
  // eslint-disable-next-line no-unused-expressions
  evt.keyCode === ESC_KEY_CODE ? filmDetailsElem.remove() : false;

  document.removeEventListener(`keydown`, closeByEsc);
};

const cardClickHandler = (evt) => {
  const film = cards[evt.target.parentElement.id];

  render(footerElement, createMoreInfoTemplate(film), `afterend`);

  let filmDetailsElem = document.querySelector(`.film-details`);
  const localCommentsContainer = filmDetailsElem.querySelector(`.film-details__comments-list`);

  for (let i = 0; i < COMMENTS_COUNT; i++) {
    render(localCommentsContainer, createLocalComments(film), `beforeend`);
  }

  const closeButElem = document.querySelector(`.film-details__close-btn`);
  closeButElem.addEventListener(`click`, () => {
    filmDetailsElem.remove();
  });

  document.addEventListener(`keydown`, closeByEsc);
};

export {cardClickHandler};
