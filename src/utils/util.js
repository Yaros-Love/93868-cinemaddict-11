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
