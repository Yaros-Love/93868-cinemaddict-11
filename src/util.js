// ф-я рандомного значения из массива
const getRandomItem = (array) => array[Math.round(Math.random() * (array.length - 1 - 0) + 0)];

//  ф-я рандома в диапазоне
const getRandomNum = function (min, max) {
  //  случайное число от min до (max+1)
  let randItem = min + Math.random() * (max + 1 - min);
  return Math.floor(randItem);
};

const clearParent = (parent, place = `beforeend`) => {
  parent.insertAdjacentHTML(place, ``);
};

export {getRandomItem, getRandomNum, clearParent};
