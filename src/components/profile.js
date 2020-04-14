const getRatingName = (number) => {
  let name = ``;
  switch (true) {
    case (number <= 10):
      name = `Novice`;
      break;
    case (number >= 11 && number <= 20):
      name = `Fan`;
      break;
    case (number >= 21):
      name = `Movie Buff`;
      break;
    default: name = ``;
  }
  return name;
};

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
