import { createContext, useContext, useState, useEffect } from "react";

/**
 * React Context used to store and manage a list of favourited podcast episodes.
 * @type {React.Context}
 */

const FavouritesContext = createContext();

/**
 * FavouritesProvider component.
 *
 * Wraps the application and provides:
 * - ability to add/remove favourites
 * - persistent favourite storage via localStorage
 * - check if an episode is already favourited
 *
 * Each favourite entry typically contains:
 * - episodeId
 * - title
 * - description
 * - showId
 * - showTitle
 * - seasonNumber
 * - episodeNumber
 * - seasonImage
 * - addedAt (timestamp)
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that will access the favourites context.
 *
 * @returns {JSX.Element} Provider wrapping child components.
 */

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  /**
   * Saves the updated favourites list to both state and localStorage.
   *
   * @param {Array} newFavs - Updated array of favourite episodes.
   */

   const save = (newFavs) => {
    setFavourites(newFavs);
    localStorage.setItem("favourites", JSON.stringify(newFavs));
  };

  /** 
   * Array storing all favourited episodes.
   * @type {[Array, Function]}
   */

   /**
   * Adds an episode to favourites.
   * If the episode already exists, nothing happens.
   *
   * @param {Object} episode - Episode data to save.
   */


  const addFavourite = (episode) => {
    const exists = favourites.some(f => f.episodeId === episode.episodeId);
    if (exists) return;
    const newFavs = [...favourites, { ...episode, addedAt: new Date().toISOString() }];
    save(newFavs);
  };

    /**
   * Removes an episode from favourites by ID.
   *
   * @param {string|number} episodeId - ID of episode to remove.
   */


  const removeFavourite = (episodeId) => {
    const newFavs = favourites.filter(f => f.episodeId !== episodeId);
    save(newFavs);
  };

  /**
   * Checks whether a specific episode is already favourited.
   *
   * @param {string|number} episodeId - Episode ID to check.
   * @returns {boolean} True if episode is favourited, false otherwise.
   */

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

/**
 * Custom hook to easily access the FavouritesContext.
 *
 * @returns {Object} favourites context with:
 * - favourites
 * - addFavourite()
 * - removeFavourite()
 * - isFavourite()
 */

export const useFavourites = () => useContext(FavouritesContext);  