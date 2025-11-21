import { useAudio } from "../../context/AudioContext";
import styles from "./AudioPlayer.module.css";

export default function AudioPlayer() {
  const {
    isPlaying,
    currentEpisode,
    playAudio,
    pauseAudio,
    progress,
    duration,
    seekAudio,
  } = useAudio();

  
  if (!currentEpisode) return null;

  return (
    <div className={styles.player}>
      
      
      <button
        className={styles.playBtn}
        onClick={() =>
          isPlaying ? pauseAudio() : playAudio(currentEpisode)
        }
      >
        {isPlaying ? "⏸︎" : "▶︎"}
      </button>

      {/* Episode info */}
      <div className={styles.info}>
        <p className={styles.title}>{currentEpisode.title}</p>
        <span className={styles.show}>{currentEpisode.showTitle}</span>
      </div>

      
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={progress}
        onChange={(e) => seekAudio(Number(e.target.value))}
        className={styles.slider}
      />

    
      <span className={styles.time}>
        {Math.floor(progress)}s / {Math.floor(duration)}s
      </span>
    </div>
  );
}
