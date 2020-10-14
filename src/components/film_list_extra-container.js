const createFilmsListExtraTemplate = (i, data) => {
  return (
    `<section class="films-list--extra">
    <h2 class="films-list__title">${data[i].title}</h2>
    <div class="films-list__container ${data[i].class}">
    </div>
    </section>`
  );
};

export {createFilmsListExtraTemplate};
