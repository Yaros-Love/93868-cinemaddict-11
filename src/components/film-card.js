const createFilmCardTemplate = (i, obj) => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${obj[i].title}</h3>
      <p class="film-card__rating">${obj[i].rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${obj[i].year}</span>
        <span class="film-card__duration">${obj[i].duration}</span>
        <span class="film-card__genre">${obj[i].genre}</span>
      </p>
      <img src="${obj[i].img}" alt="" class="film-card__poster">
      <p class="film-card__description">${obj[i].description}</p>
      <a class="film-card__comments">${obj[i].comments}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${obj[i].controls.watchlist}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${obj[i].controls.watched}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${obj[i].controls.favorite}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {createFilmCardTemplate};
