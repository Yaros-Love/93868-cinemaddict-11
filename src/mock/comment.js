import {DefaultSentences, DefaultNames} from '../const.js';
import {getRandomArrayItem, getRandomArray, formatCommentDate, getRandomDate} from '../utils/common.js';

const Emotions = [`smile`, `sleeping`, `puke`, `angry`];
const generateComment = () => {
  return {
    id: String(new Date() + Math.random()),
    text: getRandomArray(DefaultSentences),
    emotion: getRandomArrayItem(Emotions),
    author: getRandomArrayItem(DefaultNames),
    date: formatCommentDate(getRandomDate()),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {DefaultNames, generateComments};
