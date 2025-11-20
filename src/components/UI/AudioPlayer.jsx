import { useAudio } from "../../context/AudioContext";
import styles from "./AudioPlayer.module.css";

export default function AudioPlayer() {
  const {
    isPlaying,
    currentSrc,
    playAudio,
    pauseAudio,
    progress,
    duration,
    seekAudio,
  } = useAudio();

  if (!currentSrc) return null;

  return (
    <div className={styles.player}>
      <button
        className={styles.playBtn}
        onClick={() => (isPlaying ? pauseAudio() : playAudio(currentSrc))}
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>

      <input
        type="range"
        min="0"
        max={duration}
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
