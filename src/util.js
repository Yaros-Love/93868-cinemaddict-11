// ф-я рандомного значения из массива
export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

//  ф-я рандома в диапазоне, целое число
export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

//  ф-я рандома в диапазоне
export const getRandomNumber = (min, max) => {
  return min + (Math.random() * (max - min));
};

export const clearParent = (parent, place = `beforeend`) => {
  parent.insertAdjacentHTML(place, ``);
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
