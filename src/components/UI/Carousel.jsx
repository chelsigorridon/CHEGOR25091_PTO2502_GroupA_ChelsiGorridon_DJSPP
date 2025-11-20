import { useState } from "react";
import styles from  "./carousel.module.css";
import { useNavigate } from "react-router-dom";
import { genres as genreList } from "../../data.js";

export default function Carousel({ items }) {
    const [currentIndex, setCurrentIndex] = useState(0);
     const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

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
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className={styles.carouselItem}
            onClick={() => handleClick(item.id)}
          >
          <img className ={styles.imageWrap} src={item.image} alt={item.title} />
            
            {item.genres && item.genres.length > 0 && (
             <div className={styles.genres}>
            {item.genres.slice(0, 3).map((genreId) => {
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
        ))}
      </div>

      <button onClick={nextSlide} className={styles.navButton}>
        ▶
      </button>
    </div>
  );
}

