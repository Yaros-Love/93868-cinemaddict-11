export default class Movie {
  constructor(data) {
    this.id = data.id;
    this.title = data.film_info.title
    this.originalTitle =  data.film_info.alternative_title;
    this.poster = data.film_info.poster
    this.rating = data.film_info.total_rating
    this.ageRating = data.film_info.age_rating
    this.director = data.film_info.director
    this.scenarists = data.film_info.writers
    this.cast = data.film_info.actors
    this.releaseDate = data.film_info.release.date
    this.country = data.film_info.release.release_country
    this.duration = data.film_info.runtime
    this.genres = data.film_info.genre
    this.description = data.film_info.description
    this.isInWatchList = data.user_details.watchlist
    this.isInFavorite = data.user_details.favorite
    this.isInWatched = data.user_details.already_watched
    this.watchingDate = data.user_details.watching_date
    this.comments = data.comments
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments,
      "film_info": {
        "title": this.title,
        "alternative_title": this.originalTitle,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": this.ageRating,
        "director": this.director,
        "writers": this.scenarists,
        "actors": this.cast,
        "release": {
          "date": this.releaseDate,
          "release_country": this.country
        },
        "runtime": this.duration,
        "genre": this.genres,
        "description": this.description
       },
      "user_details": {
        "watchlist": this.isInWatchList ,
          "already_watched": this.isInWatched,
          "watching_date": this.watchingDate,
          "favorite": this.isInFavorite
      }
    }
  }

  // static parseComments(data) {
  //   console.log(data)
  //   return data.map((film) => {
  //
  //   })
  // }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie)
  }

  static cloneMovie(data) {
    return new Movie(data.toRAW());
  }
}
