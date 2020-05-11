import {getRatingName} from '../const.js';

const createProfileTemplate = (ratingNumber) => {
  const ratingName = getRatingName(ratingNumber);

  return (
    `<section class="header__profile profile">
        <p class="profile__rating">${ratingName}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
  );
};

export {createProfileTemplate};
