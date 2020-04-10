import { DefaultSentences, DefaultNames, Countries } from '../const.js';
import { getRandomArrayItem, getRandomIntegerNumber, getRandomArray } from '../utils.js';
import {DefaultNames} from './comment.js'


const FilmsTitles = [
  `Made for Each Other`,
  `Santa Claus Conquers the Martians`, `
  The Great Flamarion`,
  `The Man with the Golden Arm`,
  `Sagebrush Trail`,
  `The Dance of Life`,
  `Popeye the Sailor Meets Sindbad the Sailor`
];

const Posters = [
  `/public/images/posters/the-man-with-the-golden-arm.jpg`,
  `/public/images/posters/popeye-meets-sinbad.png`,
  `/public/images/posters/sagebrush-trail.jpg`,
  `/public/images/posters/santa-claus-conquers-the-martians.jpg`,
  `/public/images/posters/the-dance-of-life.jpg`,
  `/public/images/posters/the-great-flamarion.jpg`,
  `/public/images/posters/the-man-with-the-golden-arm.jpg`
];

const Genres = [
  `Drama`,
  `Film-Noir`,
  `Mystery`,
  `Comedy`,
  `Triller`
];

const getFilmDuration = (minutes) => {
  if (minutes > 60) {
    const hours = Math.trunc(minutes / 60);
    minutes = Math.floor((((minutes / 60 - hours) * 60) / 100) * 100);

    return `${hours}h ${minutes}min`;
  }
  else {
    return minutes;
  }
};

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateFilm = () => {
   return {
    title: getRandomArrayItem(FilmsTitles),
    originalTitle: film.title,
    poster: getRandomArrayItem(Posters),
    rating: `${getRandomIntegerNumber(1, 9).getRandomIntegerNumber(1, 9)}`,
    productionDate: getRandomIntegerNumber(1920, 1970),
    duration: `${getFilmDuration(getRandomIntegerNumber(30, 350))}`,
    genres: getRandomArray(Genres),
    description: getRandomArray(DefaultSentences, getRandomIntegerNumber(1, 6)).join(` `),
    commentsCount: getRandomIntegerNumber(0, 5),
    director: getRandomArrayItem(DefaultNames),
    scenarists: getRandomArray(DefaultNames),
    cast: getRandomArray(DefaultNames),
    releaseDate: `2019/12/31 23:59`,
    country: getRandomArrayItem(Countries),
    fullDescription: getRandomDescription(getRandomIntegerNumber(10, 25)),
    ageRating: getRandomIntegerNumber(6, 19),
  };
}
