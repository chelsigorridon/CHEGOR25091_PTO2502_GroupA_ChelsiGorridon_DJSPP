import { createContext, useContext, useState, useEffect } from "react";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

   const save = (newFavs) => {
    setFavourites(newFavs);
    localStorage.setItem("favourites", JSON.stringify(newFavs));
  };

  const addFavourite = (episode) => {
    const exists = favourites.some(f => f.episodeId === episode.episodeId);
    if (exists) return;
    const newFavs = [...favourites, { ...episode, addedAt: new Date().toISOString() }];
    save(newFavs);
  };

  const removeFavourite = (episodeId) => {
    const newFavs = favourites.filter(f => f.episodeId !== episodeId);
    save(newFavs);
  };

  const isFavourite = (episodeId) => {
    return favourites.some(f => f.episodeId === episodeId);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, isFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouritesContext);