const filterNames = [`All`, `Watchlist`, `History`, `Favorites`];

export const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: it === `All` ? `` : Math.floor(Math.random() * 10),
    };
  });
};
