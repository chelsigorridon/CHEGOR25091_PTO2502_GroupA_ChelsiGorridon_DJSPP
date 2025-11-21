import { useFavourites } from "../../context/FaveContext";
import styles from "./EpisodeCard.module.css";
import { useAudio } from "../../context/AudioContext";
import { useState, useEffect } from "react"; 

/**
 * EpisodeCard Component
 *
 * Renders a single episode card with:
 * - Episode thumbnail (season image)
 * - Episode title & description
 * - Favourite toggle (filled/empty heart)
 * - Play button (connected to AudioContext)
 *
 * Features:
 * - Saves and removes favourites using FaveContext
 * - Plays audio using AudioContext
 * - Stores timestamp of when an episode was favourited
 * - Uses a placeholder audio URL until the API provides one
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.episode - Episode data object
 * @param {string|undefined} props.seasonImage - The episode's season artwork
 * @param {number} props.index - Episode index within its season
 *
 * @param {string} props.episode.episodeId - Unique ID for this episode
 * @param {string} props.episode.title - Episode title
 * @param {string} props.episode.description - Short episode description
 * @param {string} props.episode.showId - ID of the parent podcast
 * @param {string} props.episode.showTitle - Title of the parent podcast
 * @param {number} props.episode.season - Season number
 *
 * @returns {JSX.Element} A fully interactive episode card
 */

export default function EpisodeCard({ episode, seasonImage, index }) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
   const { playAudio } = useAudio();
    const [audioUrl, setAudioUrl] = useState(null);
 
  const fav = isFavourite(episode.episodeId);

 /**
   * Toggles an episode as favourite by either adding or removing it from the favourites list.
   * Adds timestamp + metadata for sorting and display in the favourites page.
   */


  const toggleFavourite = () => {
    const favData = {
      episodeId: episode.episodeId,        
      title: episode.title,
      description: episode.description,
      showId: episode.showId,
      showTitle: episode.showTitle,
      seasonNumber: episode.season,         
      episodeNumber: index + 1,             
      seasonImage: seasonImage,   
      addedAt: new Date().toISOString(),          
    };

    fav ? removeFavourite(episode.episodeId) : addFavourite(favData);
  };

   /**
   * Loads a placeholder audio URL when the component mounts.
   * (The provided API does not include audio files.)
   */

   useEffect(() => {
    setAudioUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  }, []);


  return (
    <div className={styles.card}>
      <img className={styles.cover} src={seasonImage} alt="" />

      <div className={styles.info}>
        <p className={styles.title}>
          Episode {index + 1}: {episode.title}
        </p>
        <p className={styles.description}>{episode.description}</p>
      
          
        <button
          className={styles.play}
          disabled={!audioUrl}
          onClick={() =>
            playAudio({
              id: episode.episodeId,
              src: audioUrl,
              title: episode.title,
              showTitle: episode.showTitle,
            })
          }
        >
          ▶ Play Episode
        </button>
      </div>

     
      <button className={styles.heart} onClick={toggleFavourite}>
        {fav ? (
          <svg
            className={styles.filled}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <svg
            className={styles.empty}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
      </button>
    </div>
  );
}