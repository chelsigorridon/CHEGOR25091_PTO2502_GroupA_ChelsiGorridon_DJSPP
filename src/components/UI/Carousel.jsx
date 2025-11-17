import { useState } from "react";
import styles from  "./carousel.module.css";

export default function Carousel({ items }) {
    const [currentIndex, setCurrentIndex] = useState(0);

     const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };


   return (
  <div className={styles.carouselContainer}>
    <button onClick={prevSlide} className={styles.navButton}>◀</button>

    <div
      className={styles.carouselTrack}
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
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