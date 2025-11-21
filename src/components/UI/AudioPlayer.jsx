import { useAudio } from "../../context/AudioContext";
import styles from "./AudioPlayer.module.css";

/**
 * AudioPlayer Component
 *
 * A global audio player fixed at the bottom of the screen, responsible for:
 * - Displaying the currently playing episode’s title and show name
 * - Providing play/pause controls
 * - Showing playback progress using a range slider
 * - Allowing the user to seek through the audio
 * - Responding to global audio state stored in AudioContext
 *
 * This component renders *only when* an episode is selected to play.
 * Otherwise, it returns `null` and remains hidden.
 *
 * Audio state accessed from AudioContext:
 * - `isPlaying` → whether audio is currently playing
 * - `currentEpisode` → metadata of the episode being played
 * - `progress` → current playback time (seconds)
 * - `duration` → full audio length (seconds)
 * - `playAudio()` → starts or resumes playback
 * - `pauseAudio()` → pauses playback
 * - `seekAudio()` → moves playback position
 *
 * @component
 * @returns {JSX.Element | null} A styled audio player UI or nothing if no episode is selected.
 */

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

  // Do not display the audio player unless something is currently selected to play
  
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
