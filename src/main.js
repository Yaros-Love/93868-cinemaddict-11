'use strict';

(function () {
  const CARD_COUNT = 5;
  const EXTRA_CARDS_COUNT = 2;
  const headerElement = document.querySelector(`.header`);
  const mainElement = document.querySelector(`.main`);
  const footerStatElement = document.querySelector(`.footer__statistics`);

  const filmCardMoks = [{
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
  },]
  const createHeaderProfileTemplate = () => {
    return (
      `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
    );
  };

  const createNavMenuTemplate = () => {
    return (
      `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
    );
  };

  const createSoftTemplate = () => {
    return (
      `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
    );
  };

  const createFilmListContainerTemplate = () => {
    return (
      `<section class="films">
      <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>
    </section>`
    );
  };

  const createFilmCardTemplate = (i, obj = filmCardMoks) => {
    return (
      `<article class="film-card">
        <h3 class="film-card__title">${obj[i].title}</h3>
        <p class="film-card__rating">${obj[i].rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${obj[i].year}</span>
          <span class="film-card__duration">${obj[i].duration}</span>
          <span class="film-card__genre">${obj[i].genre}</span>
        </p>
        <img src="${obj[i].img}" alt="" class="film-card__poster">
        <p class="film-card__description">${obj[i].description}</p>
        <a class="film-card__comments">${obj[i].comments}</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${obj[i].controls.watchlist}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${obj[i].controls.watched}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${obj[i].controls.favorite}">Mark as favorite</button>
        </form>
      </article>`
    );
  };

  const createShowMoreButton = () => {
    return (
      `<button class="films-list__show-more">Show more</button>`
    )
  };

  const createFilmsListExtraTemplate = (i) => {
    return (
      `<section class="films-list--extra">
      <h2 class="films-list__title">${titlesExtraList[i].title}</h2>
      <div class="films-list__container ${titlesExtraList[i].class}">
      </div>
      </section>`
    );
  };

  const createCountFilmsTemplate = () => {
    return (
      `<p>130 291 movies inside</p>`
    )
  }

  const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
  };


  (() => {
    render(headerElement, createHeaderProfileTemplate(), `beforeend`);
    render(mainElement, createNavMenuTemplate(), `beforeend`);
    render(mainElement, createSoftTemplate(), `beforeend`);
    render(mainElement, createFilmListContainerTemplate(), `beforeend`);

    const filmElement = document.querySelector(`.films`);
    const filmListElement = document.querySelector(`.films-list`);
    const filmListContainer = document.querySelector(`.films-list__container`);

    for (let i = 0; i < CARD_COUNT; i++) {
      render(filmListContainer, createFilmCardTemplate(i), `beforeend`);
    };

    render(filmListElement, createShowMoreButton(), `beforeend`);

    for (let i = 0; i < titlesExtraList.length; i++) {
      render(filmElement, createFilmsListExtraTemplate(i), `beforeend`);
    };

    const topRatedContainer = document.querySelector(`.top-rated`);
    const mostCommentedContaier = document.querySelector(`.most-commented`);

    const mostRatedFilms = filmCardMoks.slice().sort((a, b) => {
      return b.rating - a.rating
    });

    const mostCommentedFilms = filmCardMoks.sort((a, b) => {
      return (parseInt(b.comments.slice(0, 3), 10) - parseInt(a.comments.slice(0, 3), 10))
    });

    for (let i = 0; i < EXTRA_CARDS_COUNT; i++) {
      render(topRatedContainer, createFilmCardTemplate(i, mostRatedFilms), `beforeend`);
      render(mostCommentedContaier, createFilmCardTemplate(i, mostCommentedFilms), `beforeend`);
    };

    render(footerStatElement, createCountFilmsTemplate(), `beforeend`);
  })();

})();
