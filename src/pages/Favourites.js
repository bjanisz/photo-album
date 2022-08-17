import { useContext } from "react";
import FavouritesContext from "../store/favourites-context";
import PhotosList from "../components/photos/PhotosList";
import "./Favourites.module.css";

import React from "react";

const Favourites = () => {
  const favouritesContext = useContext(FavouritesContext);

  let content;

  if (favouritesContext.totalFavourites === 0) {
    content = <p>So far there are no favourite photos....</p>;
  } else {
    content = <PhotosList photos={favouritesContext.favourites} />;
  }

  return (
    <section>
      <h1>My favourite photos:</h1>
      {content}
    </section>
  );
};

export default Favourites;
