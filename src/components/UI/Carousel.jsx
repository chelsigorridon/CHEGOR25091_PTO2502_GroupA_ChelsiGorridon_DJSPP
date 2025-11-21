import { useState } from "react";
import styles from  "./Carousel.module.css";
import { useNavigate } from "react-router-dom";
import { genres as genreList } from "../../data.js";

/**
 * Carousel Component
 *
 * Displays a horizontally sliding carousel of recommended podcast shows.
 * The user can navigate using left/right arrow buttons or click a card to go
 * directly to the show's detail page.
 *
 * Features:
 * - Smooth horizontal slide animation using CSS transforms
 * - Looping behaviour (when reaching the end, it wraps to the start)
 * - Displays show image and up to 3 genre tags
 * - Clicking a show navigates to `/show/:id`
 *
 * @component
 *
 * @param {Object} props
 * @param {Array} props.items - Array of show objects to render in the carousel.
 *   Each item should contain:
 *   @param {string|number} props.items[].id - Unique identifier for the show.
 *   @param {string} props.items[].title - The show's title.
 *   @param {string} props.items[].image - URL of the show's image.
 *   @param {number[]} [props.items[].genres] - Optional array of genre ID numbers.
 *
 * @returns {JSX.Element} A fully interactive sliding carousel UI.
 */

export default function Carousel({ items }) {
    const [currentIndex, setCurrentIndex] = useState(0);
     const navigate = useNavigate();

 /**
   * Moves carousel forward by one slide.
   * Wraps back to the start when reaching the last element.
   */


  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  /**
   * Moves carousel backward by one slide.
   * Wraps to the end when moving left from the first slide.
   */

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  
  /**
   * Navigates user to the selected show's detail page.
   *
   * @param {string|number} id - The ID of the show to navigate to.
   */

  const handleClick = (id) => { 
    navigate(`/show/${id}`);
  };

  

  return (
    <div className={styles.carouselContainer}>
      <button onClick={prevSlide} className={styles.navButton}>
        ◀
      </button>

      <div
        className={styles.carouselTrack}
        style={{
          width: `${items.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
        }}
      >
        {items.map((item, index) => {
          
          const safeGenres = Array.isArray(item.genres) ? item.genres : [];

          return (
            <div
              key={item.id || index}
              className={styles.carouselItem}
              onClick={() => {
                console.log("CARD CLICKED → ID:", item.id);
                handleClick(item.id);
              }}
            >
              <img
                className={styles.imageWrap}
                src={item.image}
                alt={item.title}
              />

              {safeGenres.length > 0 && (
                <div className={styles.genres}>
                  {safeGenres.slice(0, 3).map((genreId) => {
                    const g = genreList.find((genre) => genre.id === genreId);
                    return (

                      <span key={genreId} className={styles.genreTag}>
                        {g ? g.title : "Unknown"}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button onClick={nextSlide} className={styles.navButton}>
        ▶
      </button>
    </div>
  );
}