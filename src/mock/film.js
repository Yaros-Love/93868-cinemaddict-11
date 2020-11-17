import {getRandomArrayItem, getRandomIntegerNumber, getRandomNumber} from '../util.js';

const filmNames = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`, `The Great Flamarion`];

const filmDurations = [`1h 55m`, `54m`, `1h 59m`, `1h 21m`, `16m`, `1h 18m`, `1h 32m`];

const filmGenres = [`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`, `Mystery`];

const countries = [`Tokyo`, `USA`, `Germany`, `Russia`, `France`];

const commentAuthors = [`Ilya O'Reilly`, `Lucy`, `Mark Hu`, `Christother Lamrert`];

const commentEmotions = [`smile`, `sleeping`, `puke`, `angry`];

const filmPosters = [`./images/posters/the-dance-of-life.jpg`, `./images/posters/sagebrush-trail.jpg`, `./images/posters/the-man-with-the-golden-arm.jpg`, `./images/posters/santa-claus-conquers-the-martians.jpg`, `./images/posters/popeye-meets-sinbad.png`, `./images/posters/the-great-flamarion.jpg`, `./images/posters/made-for-each-other.png`];

const filmDescriptions = [`John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…`, `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…`, `In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…`, `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy MartiThe Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti……`, `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`, `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`, `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`];

const date = `2019-05-11T16:12:32.554Z`;

const generateFilm = (item, index) => {
  return {
    id: index,
    title: getRandomArrayItem(filmNames),
    originalFilmName: `Xxx`,
    rating: getRandomNumber(0, 10).toFixed(1),
    year: getRandomIntegerNumber(1920, 2020),
    country: getRandomArrayItem(countries),
    director: `Anthony Mann`,
    ageRating: getRandomIntegerNumber(0, 18),
    duration: getRandomArrayItem(filmDurations),
    writers: [`Takeshi Kitano`, `Someone`, `Who are that guys?`],
    actors: [`Johny Depp`, `M Streep`, `G Moore`, `A Joly`],
    genre: new Array(getRandomArrayItem(filmGenres)),
    poster: getRandomArrayItem(filmPosters),
    description: getRandomArrayItem(filmDescriptions),
    totalComments: getRandomIntegerNumber(0, 500),
    userDetails: {
      isWatchlist: Math.random() > 0.5,
      isWatched: Math.random() > 0.5,
      isFavorite: Math.random() > 0.5,
      watchingDate: `2019-04-12T16:12:32.554Z`,
    },
    localComment: {
      id: ``,
      author: getRandomArrayItem(commentAuthors),
      comment: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
      date: Date.parse(date),
      emotion: getRandomArrayItem(commentEmotions),
    },
  };
};

export const generateFilms = (count) => {
  if (count) {
    return new Array(count)
    .fill(``)
    .map(generateFilm);
  } else {
    return null;
  }
};

