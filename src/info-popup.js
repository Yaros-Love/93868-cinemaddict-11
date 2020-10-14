import {render} from "./main.js";
import {createMoreInfoTemplate} from "./components/more_info.js";

const footerElement = document.querySelector(`.footer`);

//  проверяем совпадают ли src, если да, то отрисовываем карточку и вешаем слушателя на closebtn
const cardClickHandler = (it) => {
  const cardImgSrc = it.getAttribute(`src`);
  window.filmCardMoks.forEach((obj) => {
    if (cardImgSrc === obj.img) {
      render(footerElement, createMoreInfoTemplate(obj), `afterend`);
      const filmDetailsElem = document.querySelector(`.film-details`);
      const closeButElem = document.querySelector(`.film-details__close-btn`);
      closeButElem.addEventListener(`click`, () => {
        filmDetailsElem.remove();
      });
    }
  });
};

export {cardClickHandler};
