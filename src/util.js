// ф-я рандомного значения из массива
const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

//  ф-я рандома в диапазоне, целое число
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

//  ф-я рандома в диапазоне
const getRandomNumber = (min, max) => {
  return min + (Math.random() * (max - min));
};

const clearParent = (parent, place = `beforeend`) => {
  parent.insertAdjacentHTML(place, ``);
};

export {getRandomArrayItem, getRandomIntegerNumber, getRandomNumber, clearParent};
