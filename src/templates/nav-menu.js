const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  const isCheckedClassName = isChecked ? `main-navigation__item--active` : ``;
  const isCount = count ? `<span class="main-navigation__item-count">${count}</span>` : ``;

  return `<a href="#${name.toLowerCase()}" class="main-navigation__item ${isCheckedClassName}">${name} ${isCount}</a>`;
};


export const createNavMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filtersMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
