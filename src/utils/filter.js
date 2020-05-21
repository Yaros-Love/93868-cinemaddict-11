import {FilterType} from "../const";

const getWatchlistFilms = (films) => {
  return films.filter((film) => film.isInWatchList);
};

const getFavoriteFilms = (films) => {
  return films.filter((film) => film.isInFavorite);
};

const getAlreadyWatched = (films) => {
  return films.filter((film) => film.isInWatched);
};

const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.FAVORITES:
      return getFavoriteFilms(films);
    case FilterType.HISTORY:
      return getAlreadyWatched(films);
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
  }

  return films;
};

export {getFilmsByFilter, getWatchlistFilms, getFavoriteFilms, getAlreadyWatched};
