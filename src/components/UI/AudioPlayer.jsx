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