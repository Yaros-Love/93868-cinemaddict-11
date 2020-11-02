const filterNames = [`All`, `Watchlist`, `History`, `Favorites`];

const generateFilters = () => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: it === `All` ? `` : Math.floor(Math.random() * 10),
    }
  });
};

export {generateFilters};
