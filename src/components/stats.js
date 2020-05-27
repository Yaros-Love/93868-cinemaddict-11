import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {createStatsTemplate} from "../templates/stats";
import moment from "moment";

const BAR_HEIGHT = 50;
const FILTER_ID_PREFIX = `statistic-`;

const FILTERS = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const FILTER_MOMENT_UNIT_OF_TIME = {
  'today': `days`,
  'week': `weeks`,
  'month': `months`,
  'year': `years`
};

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const getAllFilmsGenres = (films) => {
  let genresAll = new Set();

  films.forEach((film) => {
    film.genres.forEach((genre) => genresAll.add(genre));
  });

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
    };
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


export default class StatComponent extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();
    this._films = moviesModel;
    this._watchedFilms = this._films.getFilmsAll().filter((it) => it.isInWatched);
    this._filteredWatchedFilms = this._watchedFilms.slice();
    this._chart = null;
    this._currentFilter = FILTERS.ALL;
    this._chartData = getFilmsGenresCount(this._watchedFilms);
    this._renderChart();
    this._getSelectedFilterType();

  }

  getTemplate() {
    const watchedFilmsCount = this._filteredWatchedFilms.length;
    const topGenre = this._filteredWatchedFilms.length ? this._chartData[0].genre : ``;
    const filmDuration = this._filteredWatchedFilms.reduce(function (sum, current) {
      return sum + current.duration;
    }, 0);

    return createStatsTemplate(this._watchedFilms, watchedFilmsCount, topGenre, filmDuration, this._currentFilter);
  }

  recoveryListeners() {
    this._getSelectedFilterType();
  }


  rerender() {
    this._filteredWatchedFilms = this._getFilteredFilms();
    this._chartData = getFilmsGenresCount(this._filteredWatchedFilms);

    super.rerender();
    this._renderChart();
  }

  _getFilteredFilms() {
    const films = this._films.getFilms().filter((it) => it.isInWatched);
    const filter = this._currentFilter;

    if (filter === FILTERS.ALL) {
      return films;
    }
    return films.filter((film) => {
      const watchingDate = film.watchingDate;
      const mWatchingDate = moment(watchingDate);
      const mNow = moment();
      const unitOfTime = FILTER_MOMENT_UNIT_OF_TIME[filter];
      const mDateDiff = mNow.diff(mWatchingDate, unitOfTime);

      return mDateDiff < 1;
    });
  }

  _getSelectedFilterType() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, (evt) => {
      const filterElement = evt.target.control;
      if (!filterElement) {
        return;
      }
      const filter = filterElement.id;
      this._currentFilter = getFilterNameById(filter);
      this.rerender();
    });
  }

  _renderChart() {
    if (!this._filteredWatchedFilms.length) {
      return;
    }
    const chartCtx = this.getElement().querySelector(`.statistic__chart`);
    chartCtx.height = BAR_HEIGHT * this._chartData.length;

    this._chart = new Chart(chartCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._chartData.map((it) => it.genre),
        datasets: [{
          data: this._chartData.map((it) => it.count),
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
          barThickness: 24
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }
}

export {FILTERS};
