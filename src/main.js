import {createHeaderProfileTemplate} from "./components/header-profile.js";
import {createNavMenuTemplate} from "./components/nav-menu.js";
import {createSortTemplate} from "./components/sort-menu.js";
import {createFilmListContainerTemplate} from "./components/film_list-container.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButton} from "./components/show_more-button.js";
import {createFilmsListExtraTemplate} from "./components/film_list_extra-container.js";
import {createCountFilmsTemplate} from "./components/count_films-element.js";
import {cardClickHandler} from "./info-popup.js";

const CARD_COUNT = 5;
const EXTRA_CARDS_COUNT = 2;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatElement = document.querySelector(`.footer__statistics`);

window.filmCardMoks = [{
  title: `The Dance of Life`,
  rating: `8.3`,
  year: `1929`,
  duration: `1h 55m`,
  genre: `Musical`,
  img: `./images/posters/the-dance-of-life.jpg`,
  description: `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`,
  comments: `5 comments`,
  controls: {
    watchlist: ``,
    watched: ``,
    favorite: ``
  }
}, {
  title: `Sagebrush Trail`,
  rating: `3.2`,
  year: `1933`,
  duration: `54m`,
  genre: `Western`,
  img: `./images/posters/sagebrush-trail.jpg`,
  description: `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`,
  comments: `89 comments`,
  controls: {
    watchlist: `film-card__controls-item--active`,
    watched: ``,
    favorite: ``
  }
}, {
  title: `The Man with the Golden Arm`,
  rating: `9.0`,
  year: `1955`,
  duration: `1h 59m`,
  genre: `Drama`,
  img: `./images/posters/the-man-with-the-golden-arm.jpg`,
  description: `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`,
  comments: `18 comments`,
  controls: {
    watchlist: ``,
    watched: `film-card__controls-item--active`,
    favorite: ``
  }
}, {
  title: `Santa Claus Conquers the Martians`,
  rating: `2.3`,
  year: `1964`,
  duration: `1h 21m`,
  genre: `Comedy`,
  img: `./images/posters/santa-claus-conquers-the-martians.jpg`,
  description: `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`,
  comments: `465 comments`,
  controls: {
    watchlist: ``,
    watched: ``,
    favorite: `film-card__controls-item--active`
  }
}, {
  title: `Popeye the Sailor Meets Sindbad the Sailor`,
  rating: `6.3`,
  year: `1936`,
  duration: `16m`,
  genre: `Cartoon`,
  img: `./images/posters/popeye-meets-sinbad.png`,
  description: `In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…`,
  comments: `0 comments`,
  controls: {
    watchlist: `film-card__controls-item--active`,
    watched: `film-card__controls-item--active`,
    favorite: `film-card__controls-item--active`
  }
}, {
  title: `The Great Flamarion`,
  rating: `8.9`,
  year: `1945`,
  duration: `1h 18m`,
  genre: `Mystery`,
  img: `./images/posters/the-great-flamarion.jpg`,
  description: `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…`,
  comments: `12 comments`,
  controls: {
    watchlist: `film-card__controls-item--active`,
    watched: `film-card__controls-item--active`,
    favorite: `film-card__controls-item--active`
  }
}, {
  title: `Made for Each Other`,
  rating: `5.8`,
  year: `1939`,
  duration: `1h 32m`,
  genre: `Comedy`,
  img: `./images/posters/made-for-each-other.png`,
  description: `John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…`,
  comments: `56 comments`,
  controls: {
    watchlist: `film-card__controls-item--active`,
    watched: `film-card__controls-item--active`,
    favorite: `film-card__controls-item--active`
  }
}];

const titlesExtraList = [{
  title: `Top rated`,
  class: `top-rated`
}, {
  title: `Most commented`,
  class: `most-commented`
}];

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createHeaderProfileTemplate(), `beforeend`);
render(mainElement, createNavMenuTemplate(), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createFilmListContainerTemplate(), `beforeend`);

const filmElement = document.querySelector(`.films`);
const filmListElement = document.querySelector(`.films-list`);
const filmListContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_COUNT; i++) {
  render(filmListContainer, createFilmCardTemplate(i, window.filmCardMoks), `beforeend`);
}

render(filmListElement, createShowMoreButton(), `beforeend`);

for (let i = 0; i < titlesExtraList.length; i++) {
  render(filmElement, createFilmsListExtraTemplate(i, titlesExtraList), `beforeend`);
}

const topRatedContainer = document.querySelector(`.top-rated`);
const mostCommentedContaier = document.querySelector(`.most-commented`);

const mostRatedFilms = window.filmCardMoks.slice().sort((a, b) => {
  return b.rating - a.rating;
});

const mostCommentedFilms = window.filmCardMoks.slice().sort((a, b) => {
  return (parseInt(b.comments.slice(0, 3), 10) - parseInt(a.comments.slice(0, 3), 10));
});

for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
  render(topRatedContainer, createFilmCardTemplate(i, mostRatedFilms), `beforeend`);
  render(mostCommentedContaier, createFilmCardTemplate(i, mostCommentedFilms), `beforeend`);
}

render(footerStatElement, createCountFilmsTemplate(), `beforeend`);

//  listeners for cards, open popap with exta inf.
const filmCardPosters = document.querySelectorAll(`.film-card__poster`);
filmCardPosters.forEach((it) => {
  it.addEventListener(`click`, function () {
    cardClickHandler(it);
  });
});

export {render};
