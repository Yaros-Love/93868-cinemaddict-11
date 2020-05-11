const ALL_FILMS_COUNT = 20;

const DefaultSentences = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
  `Sed sed nisi sed augue convallis suscipit in sed felis. `,
  `Aliquam erat volutpat. `,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `,
];

const DefaultNames = [
  `Albert Einstein`,
  `Niels Bohr`,
  `Stephen Hawking`,
  `Isaac Newton`,
  `Galileo Galilei`,
  `Nikola Tesla`,
  `Marie Curie`,
  `Richard Feynman`,
  `Michael Faraday`,
  `Max Planck`,
  `Alessandro Volta`,
  `James Clerk Maxwell`,
  `Erwin Schrodinger`,
  `Werner Heisenberg`
];

const Countries = [
  `Belarus`,
  `Czechia`,
  `Turkmenistan`,
  `Qatar`,
  `Cambodia`,
  `Australia`,
  `Uruguay`,
  `Viet Nam`,
  `Tuvalu`
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

const FilterStatType = {
  ALL: `All time`,
  TODAY: `Today`,
  WEEK: `Week`,
  MONTH: `Month`,
  YEAR: `Year`
};

export {DefaultSentences, DefaultNames, Countries, ALL_FILMS_COUNT, FilterType, getRatingName};
