const createFilmsListExtraTemplate = (array) => {
  let listExtraTemplate = ``;
  for (let i = 0; i < array.length; i++) {
    listExtraTemplate = listExtraTemplate + `<section class="films-list--extra">
    <h2 class="films-list__title">${array[i].title}</h2>
    <div class="films-list__container ${array[i].class}">
    </div>
    </section>\n`;
  }
  return listExtraTemplate;
};

export {createFilmsListExtraTemplate};
