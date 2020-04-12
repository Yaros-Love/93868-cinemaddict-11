import { DefaultSentences, DefaultNames } from '../const.js';
import { getRandomArrayItem, getRandomArray, getDate } from '../utils.js';

const Emotions = [`smile`, `sleeping`, `puke`, `angry`];
const generateComment = () => {
  return {
    text: getRandomArray(DefaultSentences),
    emotion: getRandomArrayItem(Emotions),
    author: getRandomArrayItem(DefaultNames),
    date: getDate(),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export { DefaultNames, generateComments};
