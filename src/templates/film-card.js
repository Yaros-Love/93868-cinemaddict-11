const classNameForButton = new Map ([
  [`watchlist`, `add-to-watchlist`],
  [`watched`, `mark-as-watched `],
  [`favorite`, `favorite`],
]);

const createFilmControlButtonMarkup = (name, isActive = false) => {
  return `<button class="film-card__controls-item button film-card__controls-item--${classNameForButton.get(name)} ${isActive ? `film-card__controls-item--active` : `` }">Add to ${name}</button>`;
};

const createFilmCardTemplate = (film) => {
  const {title, poster, rating, productionDate, duration, genres, comments, description} = film;

  const longDescriptionFormat = description.length < 140 ? description : description.slice(0, 139) + `...`;

  const watchListButton = createFilmControlButtonMarkup(`watchlist`, film.isInWatchList);
  const watchedButton = createFilmControlButtonMarkup(`watched`, film.isInWatched);
  const favoriteButton = createFilmControlButtonMarkup(`favorite`, film.isInFavorite);

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${productionDate}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genres[0]}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${longDescriptionFormat}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            ${watchListButton}
            ${watchedButton}
            ${favoriteButton}
          </form>
        </article>`
  );
};

export {createFilmCardTemplate};
