import { createContext, useContext, useEffect, useRef, useState } from "react";
import { fetchPodcasts } from "../api/fetchPata";

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
      fetchPodcasts(setCurrentSrc, setIsPlaying,  setProgress, setDuration);
    }, []);

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

     audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () =>
      setDuration(audio.duration)
    );

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [currentSrc]);

  const playAudio = (src) => {
    const audio = audioRef.current;

    if (currentSrc !== src) {
      setCurrentSrc(src);
      audio.src = src;

      const saved = listeningHistory[src];
      if (saved) audio.currentTime = saved.lastPosition;
    }

    audio.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const seekAudio = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const resetHistory = () => {
    setListeningHistory({});
    localStorage.removeItem("listeningHistory");
  };

  
  useEffect(() => {
    const warn = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [isPlaying]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentSrc,
        playAudio,
        pauseAudio,
        seekAudio,
        progress,
        duration,
        listeningHistory,
        resetHistory,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}