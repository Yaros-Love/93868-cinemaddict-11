import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getRatingName, FilterStatType} from '../const';
import {getFilmDuration} from '../utils/common';

const getAllFilmsGenres = (films) => {
  let genresAll = new Set();

  films.forEach((film) => {
    film.genres.forEach((genre) => genresAll.add(genre));
  })

  return Array.from(genresAll);
};

const getFilmsGenresCount = (films) => {
  if (films.length === 0) {
    return [];
  }

  const genres = getAllFilmsGenres(films);
  const getStatByGenres = genres.map((genre) => {
    return {
      genre,
      count: 0
    }
  });

  films.forEach((film) => {
    getStatByGenres.forEach((genre) => {
      if (film.genres.includes(genre.genre)) {
        genre.count++;
      }
    });
  });

  return getStatByGenres.sort((a, b) => b.count - a.count);
};

