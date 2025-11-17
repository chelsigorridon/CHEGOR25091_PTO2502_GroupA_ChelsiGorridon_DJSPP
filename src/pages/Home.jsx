import {
  SearchBar,
  SortSelect,
  GenreFilter,
  PodcastGrid,
  Pagination,
  Loading,
  Error,
} from "../components";
import styles from "./Home.module.css";
import { genres } from "../data";
import { PodcastContext } from "../context/PodcastContext";
import { useContext } from "react";
import Carousel from "../components/UI/Carousel";

export default function Home() {
  const { podcasts, loading, error } = useContext(PodcastContext);

  console.log(podcasts[0]);
  
const carouselItems =
  podcasts?.map((pod) => ({
    id: pod.id,
    title: pod.title,
    image: pod.image || "https://via.placeholder.com/300x400?text=No+Image",
  })) || [];

  return (
    <main className={styles.main}>
     
      <section className={styles.controls}>
        <SearchBar />
        <GenreFilter genres={genres} />
        <SortSelect />
      </section>

      {!loading && !error && podcasts.length > 0 && (
        <Carousel items={carouselItems} />
      )}

      {loading && <Loading message="Loading podcasts..." />}
      {error && (
        <Error message={`Error occurred while fetching podcasts: ${error}`} />
      )}

      {!loading && !error && (
        <>
          <PodcastGrid />
          <Pagination />
        </>
      )}
    </main>
  );
}
