import { useContext } from "react";

import React from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

import FavouritesContext from "../../store/favourites-context";

const MainNavigation = () => {
  const favouritesContext = useContext(FavouritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Janisz photo album</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Photo gallery</Link>
          </li>
          <li>
            <Link to="/new-photo">Add new photo</Link>
          </li>
          <li>
            <Link to="/favourites">
              My favourite photos
              <span className={classes.badge}>{favouritesContext.totalFavourites}</span>
              </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
