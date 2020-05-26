import {FILTERS} from "../components/stats";
import {ProfileRatingRules} from "../const";

const getProfileRating = (watchedFilmsCount) => {
  const ratingRule = ProfileRatingRules.find((rule) => {
    return rule.from <= watchedFilmsCount && watchedFilmsCount <= rule.to;
  });

  return ratingRule.rating;
};


const getFilters = (currentFilter) => {
  return  Object.values(FILTERS).map((filter) => {
    const label = filter
      .replace(filter[0], filter[0].toUpperCase())
      .replace(`-`, ` `);
    const checked = filter === currentFilter;

    return `
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter}" value="${filter}" ${checked ? `checked` : ``}>
        <label for="statistic-${filter}" class="statistic__filters-label">${label}</label>
      `.trim();
  });
}

const createStatsTemplate = (films, watchedFilmsCount, topGenre, filmDuration, currentFilter) => {
  const filters = getFilters(currentFilter);

  return (
    `<section class="statistic">
       <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getProfileRating(films.length)}</span>
    </p>
    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${filters.join(``)}
    </form>
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilmsCount}<span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${Math.floor(filmDuration / 60)}<span class="statistic__item-description">h</span>${filmDuration % 60}<span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
}

export {createStatsTemplate};
