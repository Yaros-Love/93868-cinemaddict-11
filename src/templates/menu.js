const createFilterMarkup = (filter, isActive) => {
  const isFilterAll = !!(filter.name === `All movies`);

  return (`
    <a href="#${filter.name}" id="${filter.name}" class="main-navigation__item
    ${isActive ? `main-navigation__item--active` : ``}">
    ${filter.name}
      ${isFilterAll ? `` : `<span class="main-navigation__item-count">${filter.count}</span>`}
    </a>`);
};

const createMenuTemplate = (filters) => {
  const filterMarkup = filters.map((item) => createFilterMarkup(item, item.isActive)).join(`\n`);

  console.log(filters);

  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export {createMenuTemplate};
