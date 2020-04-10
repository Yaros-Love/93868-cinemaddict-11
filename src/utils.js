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

export { getRandomIntegerNumber, getRandomArrayItem, getRandomArray };
