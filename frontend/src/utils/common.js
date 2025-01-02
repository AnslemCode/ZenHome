export const updateFavourites = (id, favourites) => {
  if (favourites?.includes(id)) {
    return favourites.filter((favourite) => favourite !== id);
  } else {
    return [...favourites, id];
  }
};

export const checkFavourites = (id, favourites) => {
  return favourites?.includes(id) ? "#8ac243" : "white";
};
