import { useFavourites } from "../../context/FaveContext";
import styles from "./EpisodeCard.module.css";
import { useAudio } from "../../context/AudioContext";
import { useState, useEffect } from "react"; 

export default function EpisodeCard({ episode, seasonImage, index }) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
   const { playAudio } = useAudio();
    const [audioUrl, setAudioUrl] = useState(null);
 
  const fav = isFavourite(episode.episodeId);

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