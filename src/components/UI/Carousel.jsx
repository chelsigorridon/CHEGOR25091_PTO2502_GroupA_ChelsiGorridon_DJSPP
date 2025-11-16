import { useState } from "react";
import "./carousel.module.css";

export default function Carousel({ items }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % shows.length);
    };

    const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + shows.length) % shows.length);
   };

   return (
    <div className={styles.carouselContainer}>
      <button onClick={prevSlide} className={styles.navButton}>◀</button>

      <div className={styles.carouselTrack}>
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className={`${styles.carouselItem} ${
              index === currentIndex ? styles.active : ""
            }`}
          >
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      <button onClick={nextSlide} className={styles.navButton}>▶</button>
    </div>
  );
}