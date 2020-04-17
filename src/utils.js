const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};


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
    } else {
      continue;
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

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};


const getDate = () => {
  const targetDate = Math.random() > 0.5 ? new Date() : getRandomDate();
  const year = targetDate.getFullYear();
  let month = castTimeFormat(targetDate.getMonth() + 1);
  let day = castTimeFormat(targetDate.getDate());
  let hours = castTimeFormat(targetDate.getHours());
  let minutes = castTimeFormat(targetDate.getMinutes());

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = `beforeend`) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};


export {getRandomIntegerNumber, getRandomArrayItem, getRandomArray, getDate, createElement, render, RenderPosition};
