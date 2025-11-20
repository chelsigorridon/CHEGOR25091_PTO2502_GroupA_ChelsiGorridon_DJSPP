import { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentSrc, setCurrentSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [listeningHistory, setListeningHistory] = useState(() => {
    const saved = localStorage.getItem("listeningHistory");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("listeningHistory", JSON.stringify(listeningHistory));
  }, [listeningHistory]);

 
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress(audio.currentTime);

      setListeningHistory((prev) => ({
        ...prev,
        [currentSrc]: {
          lastPosition: audio.currentTime,
          duration: audio.duration,
          finished: audio.currentTime >= audio.duration - 1
        }
      }));
    };