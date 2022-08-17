import { createContext, useEffect, useState } from "react";

const FavouritesContext = createContext({
  favourites: [],
  totalFavourites: 0,
  addFavourite: (favouritePhoto) => {},
  removeFavourite: (photoId) => {},
  itemIsFavourite: (photoId) => {},
});

export function FavouritesContextProvider(props) {
  const [userFavourites, setUserFavourites] = useState(() => {
    const localData = localStorage.getItem('userFavourites');
    console.log(localData)
    return localData ? JSON.parse(localData) : [];
  });

    useEffect(() => {
    localStorage.setItem('userFavourites', JSON.stringify(userFavourites));
  }, [userFavourites]);

  function addFavouritesHandler(favouritePhoto) {
    setUserFavourites((previousUserFavourites) => {
      return previousUserFavourites.concat(favouritePhoto);
    });
  }

  function removeFavouriteHandler(photoId) {
    setUserFavourites((previousUserFavourites) => {
      return previousUserFavourites.filter((photo) => photo.id !== photoId);
    });
  }

  function itemIsFavouriteHandler(photoId) {
    return userFavourites.some((photo) => photo.id === photoId);
  }

  const context = {
    favourites: userFavourites,
    totalFavourites: userFavourites.length,
    addFavourite: addFavouritesHandler,
    removeFavourite: removeFavouriteHandler,
    itemIsFavourite: itemIsFavouriteHandler,
  };

  
  return (
    <FavouritesContext.Provider value={context}>
      {props.children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContext;
