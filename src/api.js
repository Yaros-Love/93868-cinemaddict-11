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
    let moviesArr = [];
    return this._load({url: `movies`})
      .then((response) =>  response.json())
      .then((movies) => {
        moviesArr = movies;
        return movies.map((movie) => this.getComment(movie))
      })
      .then((commentsPromises) => Promise.all(commentsPromises))
      .then(comments => {
        console.log(moviesArr, comments);
        moviesArr.forEach((movie, i) => movie.comments = comments[i]);

        return Movie.parseMovies(moviesArr);
      })
  }

  updateFilm(id, body) {
    console.log(`body`, body.toRAW())
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(body.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Movie.parseMovie)
  }

  getComment(movie) {
    return this._load({url: `comments/${movie.id}`})
        .then((response) =>  response.json())
  }

  createComment() {

  }

  deleteComment() {

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
