 import { useFavourites } from "../context/FaveContext"
import { useState } from "react";
import styles from "./FavePage.module.css";

export default function Favourites() {
  const { favourites } = useFavourites();
  const [sortOption, setSortOption] = useState("title-asc");


  const grouped = favourites.reduce((acc, fav) => {
    if (!acc[fav.showTitle]) acc[fav.showTitle] = [];
    acc[fav.showTitle].push(fav);
    return acc;
  }, {});

  
  const sortEpisodes = (episodes) => {
    switch (sortOption) {
      case "title-asc":
        return [...episodes].sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return [...episodes].sort((a, b) => b.title.localeCompare(a.title));
      case "date-newest":
        return [...episodes].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
      case "date-oldest":
        return [...episodes].sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
      default:
        return episodes;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Your Favourite Episodes</h1>

      <div className={styles.sortBar}>
        <label>Sort by:</label>
        <select
          className={styles.sortSelect}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
          <option value="date-newest">Newest Added</option>
          <option value="date-oldest">Oldest Added</option>
        </select>
      </div>

      {Object.keys(grouped).length === 0 && (
        <p className={styles.empty}>You haven't added any favourites yet 💔</p>
      )}

      {Object.keys(grouped).map((showTitle) => (
        <div key={showTitle} className={styles.showGroup}>
          <h2 className={styles.showTitle}>{showTitle}</h2>

          <div className={styles.episodeGrid}>
            {sortEpisodes(grouped[showTitle]).map((ep) => (
              <div key={ep.episodeId} className={styles.episodeCard}>
                <p className={styles.episodeTitle}>{ep.title}</p>

                <div className={styles.meta}>
                  <span>
                    Season {ep.seasonNumber} • Episode {ep.episodeNumber}
                  </span>
                  <span className={styles.date}>
                    Added: {new Date(ep.addedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}