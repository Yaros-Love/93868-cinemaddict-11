import { DefaultSentences, DefaultNames, Countries } from '../const.js';
import { getRandomArrayItem, getRandomIntegerNumber, getRandomArray, getDate } from '../utils.js';
import { generateComments } from './comment.js';


const FilmsTitles = [
  `Made for Each Other`,
  `Santa Claus Conquers the Martians`,
  `The Great Flamarion`,
  `The Man with the Golden Arm`,
  `Sagebrush Trail`,
  `The Dance of Life`,
  `Popeye the Sailor Meets Sindbad the Sailor`
];

const Posters = [
  `./images/posters/the-man-with-the-golden-arm.jpg`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
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
  } else {
    return `${minutes}min`;
  }
};

const generateFilm = () => {
  return {
    title: getRandomArrayItem(FilmsTitles),
    originalTitle: getRandomArrayItem(FilmsTitles),
    poster: getRandomArrayItem(Posters),
    rating: `${getRandomIntegerNumber(5, 9)}.${getRandomIntegerNumber(1, 9)}`,
    productionDate: getRandomIntegerNumber(1920, 1970),
    duration: `${getFilmDuration(getRandomIntegerNumber(30, 350))}`,
    genres: getRandomArray(Genres),
    description: getRandomArray(DefaultSentences, getRandomIntegerNumber(1, 6)).join(` `),
    comments: generateComments(getRandomIntegerNumber(0, 5)),
    director: getRandomArrayItem(DefaultNames),
    scenarists: getRandomArray(DefaultNames).join(`, `),
    cast: getRandomArray(DefaultNames).join(`, `),
    releaseDate: getDate(),
    country: getRandomArrayItem(Countries),
    fullDescription: getRandomArray(DefaultSentences, getRandomIntegerNumber(20, 35)).join(` `),
    ageRating: getRandomIntegerNumber(6, 19),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export { generateFilms };
