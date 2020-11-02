const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<a href="#${name.toLowerCase()}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">${name} ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
  );
};


const createNavMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
     ${filtersMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export {createNavMenuTemplate};
