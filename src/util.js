'use strict';

(() => {
  //ф-я рандомного значения из массива
  const getRandomItem = array => array[Math.round(Math.random() * (array.length - 1 - 0) + 0)];;

  //ф-я рандома в диапазоне
  const getRandomNum = (min, max) => {
    //  случайное число от min до (max+1)
    let randItem = min + Math.random() * (max + 1 - min);
    return Math.floor(randItem);
  };

  return window.util = {
    getRandomItem: getRandomItem,
    getRandomNum: getRandomNum,
  };
})();
