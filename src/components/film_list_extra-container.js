const createFilmsListExtraTemplate = (i) => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">${titlesExtraList[i].title}</h2>
    <div class="films-list__container ${titlesExtraList[i].class}">
    </div>
    </section>`
  );
};

export {createFilmsListExtraTemplate};