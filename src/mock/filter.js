import {getRandomIntegerNumber} from '../utils/common';
import {ALL_FILMS_COUNT, FilterType} from '../const.js';

const filterNames = Object.values(FilterType);

const getFilters = () => {
  return filterNames.map((filter) => {
    return {
      title: filter,
      name: filter.charAt(0).toLowerCase() + filter.slice(1).split(` `)[0],
      count: getRandomIntegerNumber(0, ALL_FILMS_COUNT)
    };
  });
};

export {getFilters};
