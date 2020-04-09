import { DefaultSentences } from '../const.js';
import { getRandomArrayItem, getRandomIntegerNumber } from '../utils.js';

const Emotions = [`smile`, `sleeping`, `puke`, `angry`];

const EmotionsMap = new Map([
  [`smile`, `public/images/emoji/smile.png`],
  [`sleeping`, `public/images/emoji/sleeping.png`],
  [`puke`, `public/images/emoji/puke.png`],
  [`angry`, `public/images/emoji/angry.png`]
]);

const DefaultNames = [
  `Albert`,
  `Michael`,
  `Isaac`,
  `Mary`,
  `Steven`
];

const comment = {
  text: getRandomArrayItem(DefaultSentences),
  emotion: EmotionsMap.get(getRandomArrayItem(Emotions)),
  author: getRandomArrayItem(DefaultNames),
  date: `2019/12/31 23:59`,
};

export { DefaultNames };
