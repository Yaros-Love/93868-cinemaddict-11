import FilmCommentComponent from '../components/film-details-comment';
import {formatDateFullDate, getFilmDuration} from "../utils/common";

const tableTerms = new Map([
  [`Director`, `director`],
  [`Writers`, `scenarists`],
  [`Actors`, `cast`],
  [`Release Date`, `releaseDate`],
  [`Runtime`, `duration`],
  [`Country`, `country`],
  [`Genres`, `genres`]
]);

const filmControls = new Map([
  [`watchlist`, `Add to watchlist`],
  [`watched`, `Already watched`],
  [`favorite`, `Add to favorites`]
]);


const createTableCellMarkup = (arrayProp) => {
  return arrayProp.map((item) => {
    return (`
      <span>${item}</span>
    `);
  }).join(`\n`);
};

const createDetailsTableMarkup = (film) => {
  const tableTitles = Object.keys(Object.fromEntries(tableTerms));
  return tableTitles.map((key) => {
    if (Array.isArray(film[tableTerms.get(key)]) && film[tableTerms.get(key)].length > 1) {
      return (`
        <tr class="film-details__row">
          <td class="film-details__term">${key}</td>
          <td class="film-details__cell">
            ${createTableCellMarkup(film[tableTerms.get(key)])}
          </td>
        </tr>
      `);
    } else {
      return (`
        <tr class="film-details__row">
          <td class="film-details__term">${key === `Genres` ? `Genre` : key}</td>
          <td class="film-details__cell">${film[tableTerms.get(key)]}</td>
        </tr>
      `);
    }
  }).join(`\n`);
};

const createPlaceholderEmojiMarkup = (emoji) => {
  return (
    `<div for="add-emoji" class="film-details__add-emoji-label">
        ${emoji ? `<img src="./images/emoji/${emoji}.png" width=55" height="55" alt="emoji">` : ``}
    </div>`
  );
};


const createControlsMarkup = (control, isActive = false) => {
  return (
    `<input type="checkbox" ${isActive ? `checked` : ``} class="film-details__control-input visually-hidden" id="${control}" name="${control}">
      <label for="${control}" class="film-details__control-label film-details__control-label--${control}">${filmControls.get(control)}</label>`
  );
};

const createFilmDetailsTemplate = (film) => {
  const {poster, title, originalTitle, rating, ageRating, description, comments} = film;

  const filmFormatFields = Object.assign({}, film, {
    releaseDate: formatDateFullDate(film.releaseDate),
    duration: getFilmDuration(film.duration)
  });
  const tableMarkup = createDetailsTableMarkup(filmFormatFields);
  const watchListControl = createControlsMarkup(`watchlist`, film.isInWatchList);
  const watchedControl = createControlsMarkup(`watched`, film.isInWatched);
  const favoriteControl = createControlsMarkup(`favorite`, film.isInFavorite);
  const commentsMarkup = comments.map((comment) => new FilmCommentComponent(comment).getTemplate()).join(`\n`);
  const placeholderEmojiMarkup = createPlaceholderEmojiMarkup();

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                ${tableMarkup}
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            ${watchListControl}
            ${watchedControl}
            ${favoriteControl}
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsMarkup}
            </ul>

            <div class="film-details__new-comment">
              ${placeholderEmojiMarkup}

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export {createFilmDetailsTemplate, createPlaceholderEmojiMarkup};
