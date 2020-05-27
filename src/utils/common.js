import moment from "moment";

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArray = (baseArray, count = baseArray.length) => {
  const newArray = [];
  for (let i = 0; i < baseArray.length && i < count; i++) {
    if (Math.random() > 0.5) {
      newArray.push(baseArray[i]);
    }
  }
  return newArray;
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

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

const formatReleaseDate = (date) => {
  return moment(date).format(`YYYY`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const formatCommentDate = (date) => {
  return moment(date).format(`YYYY/MM/DD hh:mm`);
};


export {getRandomIntegerNumber, getRandomArrayItem, getFilmDuration, getRandomArray, formatDate, getRandomDate, formatCommentDate, formatReleaseDate};
