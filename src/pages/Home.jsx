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

/**
 * Home Page Component
 *
 * This component serves as the main landing page of the Podcast App.
 * It displays:
 *  - Search bar
 *  - Genre filter
 *  - Sorting options
 *  - Recommended carousel
 *  - Main podcast grid
 *  - Pagination controls
 *
 * Data is fetched from PodcastContext and displayed conditionally
 * based on loading/error states.
 */

/** 
   * Extract podcast data and states from the global PodcastContext.
   * @type {{podcasts: Array, loading: boolean, error: string}}
   */

export default function Home() {
  const { podcasts, loading, error } = useContext(PodcastContext);

  /**
   * Prepare carousel items for the Recommended section.
   * Ensures fallback values for missing properties.
   *
   * @type {Array<{
   *   id: string,
   *   title: string,
   *   image: string,
   *   genres: number[]
   * }>}
   */
  
  const carouselItems =
  podcasts?.map((p) => ({
    id: p.id,
    title: p.title || p.name,
    image: p.image || p.image_url || "/fallback-300x400.png",
    genres: p.genres || p.categories || p.tags || [],
  })) || [];

  return (
    <main className={styles.main}>
      
      <section className={styles.controls}>
        <SearchBar />
        <GenreFilter genres={genres} />
        <SortSelect />
      </section>

      {!loading && carouselItems.length > 0 && (
  <section style={{ marginBottom: "1.5rem" }}>
    <h2 className={styles.Recommended} >
      Recommended
    </h2>

    <Carousel items={carouselItems} autoPlay={true} autoPlayInterval={6000} />
  </section>
     
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
