import moment from "moment";

const getFilmDuration = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  const durationHours = duration.hours();
  const durationMinutes = duration.minutes();

  if (minutes < 60) {
    return `${durationMinutes}m`;
  } else {
    return `${durationHours}h ${durationMinutes}m`;
  }
};

const formatReleaseDateOnlyYear = (date) => {
  return moment(date).format(`YYYY`);
};

const formatDateFullDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const formatCommentDate = (date) => {
  const diff = moment(date).diff(moment());
  return moment.duration(diff).humanize(true);
};


export {getFilmDuration, formatDateFullDate, formatCommentDate, formatReleaseDateOnlyYear};
