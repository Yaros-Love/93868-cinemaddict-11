const createFooterStatTemplate = (moviesCount) => {
  let numberFormat = new Intl.NumberFormat(`ru`);
  numberFormat = numberFormat.format(moviesCount);

  return (
    `<p>${numberFormat} movies inside</p>`
  );
};

export { createFooterStatTemplate };
