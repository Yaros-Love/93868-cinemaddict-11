export default class Movie {
  constructor(data) {

  }

  toRAW() {

  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovies)
  }

  static cloneMovie(data) {
    return new Movie(data.toRAW());
  }
}
