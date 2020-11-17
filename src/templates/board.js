export const createBoardTemplate = (films) => {
  const titleValue = films ? `All movies. Upcoming` : `There are no movies in our database`;
  const className = films ? `visually-hidden` : ``;

  return `<section class="films">
    <section class="films-list">
    <h2 class="films-list__title ${className}">${titleValue}</h2>
  </section>
  </section>`;
};
