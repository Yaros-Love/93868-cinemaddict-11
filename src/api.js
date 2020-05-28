import Movie from "./models/movie";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    let movies = [];
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then((response) => {
        movies = response;
        return movies.map((movie) => this.getComment(movie));
      })
      .then((commentsPromises) => Promise.all(commentsPromises))
      .then((comments) => {
        movies.forEach((movie, i) => {
          movie.comments = comments[i]
        });
        return Movie.parseMovies(movies);
      });
  }

  updateFilm(id, body) {
    let film = {};
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(body.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then((movie) => {
        film = movie;
        return this.getComment(movie);
      })
      .then((commentsPromises) => Promise.all(commentsPromises))
      .then((comments) => {
        film.comments = comments;
        return Movie.parseMovie(film);
      });
  }

  getComment(movie) {
    return this._load({url: `comments/${movie.id}`})
        .then((response) => response.json());
  }

  createComment(id, body) {
    let film = {};
    return this._load({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(body),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then((response) => response.json())
      .then((data) => {
        return film = data.movie;
      })
      .then((movie) => this.getComment(movie))
      .then((commentsPromises) => Promise.all(commentsPromises))
      .then((comments) => {
        film.comments = comments;
        return Movie.parseMovie(film);
      });
  }

  deleteComment(id) {
    return this._load({url: `comments/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}

export {Method};
