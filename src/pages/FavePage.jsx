 import { useFavourites } from "../context/FaveContext"
import { useState } from "react";

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
    <div>
      <h1>Your Favourites</h1>

      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="title-asc">Title A–Z</option>
        <option value="title-desc">Title Z–A</option>
        <option value="date-newest">Newest Added</option>
        <option value="date-oldest">Oldest Added</option>
      </select>

      {Object.keys(grouped).map((showTitle) => (
        <div key={showTitle}>
          <h2>{showTitle}</h2>

          {sortEpisodes(grouped[showTitle]).map((ep) => (
            <div key={ep.episodeId}>
              <p>{ep.title}</p>
              <small>
                Season {ep.seasonNumber} • Episode {ep.episodeNumber}
              </small>
              <br />
              <small>Added: {new Date(ep.addedAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}