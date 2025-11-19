import { useFavourites } from "../context/FavouritesContext";
import styles from "./EpisodeCard.module.css";

export default function EpisodeCard({ episode, seasonImage, index }) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const fav = isFavourite(episode.id);

  const toggleFavourite = () => {
    const favData = {
      episodeId: episode.id,
      title: episode.title,
      showId: episode.showId,
      showTitle: episode.showTitle,
      seasonNumber: episode.season,
      episodeNumber: index + 1,
    };

    fav ? removeFavourite(episode.id) : addFavourite(favData);
  };

  return (
    <div className={styles.card}>
      <img className={styles.cover} src={seasonImage} alt="" />

      <div className={styles.info}>
        <p className={styles.title}>
          Episode {index + 1}: {episode.title}
        </p>
        <p className={styles.description}>{episode.description}</p>
      </div>

      <button className={styles.heart} onClick={toggleFavourite}>
        {fav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}