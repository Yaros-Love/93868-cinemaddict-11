const ProfileRating = {
  NO: ``,
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BAF: `Movie Buff`,
};

const ProfileRatingRules = [
  {rating: ProfileRating.NO, from: 0, to: 0},
  {rating: ProfileRating.NOVICE, from: 1, to: 10},
  {rating: ProfileRating.FAN, from: 11, to: 20},
  {rating: ProfileRating.MOVIE_BAF, from: 21, to: Infinity}
];

const getRatingName = (number) => {
  let name = ``;
  switch (true) {
    case (number <= 10):
      name = `Novice`;
      break;
    case (number >= 11 && number <= 20):
      name = `Fan`;
      break;
    case (number >= 21):
      name = `Movie Buff`;
      break;
    default: name = ``;
  }
  return name;
};

const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`
};

export {ProfileRatingRules, ProfileRating,  FilterType};
