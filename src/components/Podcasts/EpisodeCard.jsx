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
      seasonImage: seasonImage              
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
        onClick={() => {
         console.log("Playing audio:", audioUrl);
       playAudio(audioUrl);
     }}
      >
        ▶ Play Episode
      </button>
      </div>

      <button className={styles.heart} onClick={toggleFavourite}>
        {fav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}