import { createContext, useContext, useEffect, useRef, useState } from "react";

/**
 * React Context used to provide global audio playback state and controls.
 * @type {React.Context<any>}
 */
const AudioContext = createContext();

/**
 * AudioProvider component.
 *
 * Wraps the application and provides audio playback functionality:
 * - playing/pausing audio
 * - saving/restoring listening progress
 * - tracking the current episode
 * - marking episodes as finished
 * - storing persistent history in localStorage
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components wrapped by provider
 * @returns {JSX.Element} Provider wrapper
 */
export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  /**
   * Stores listening history for all episodes.
   * Saves:
   * - lastPosition
   * - duration
   * - finished state
   * - lastPlayedAt timestamp
   */

  /** Persist history to localStorage */
  const [listeningHistory, setListeningHistory] = useState(() => {
    const saved = localStorage.getItem("listeningHistory");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("listeningHistory", JSON.stringify(listeningHistory));
  }, [listeningHistory]);

  /**
   * Syncs audio element progress updates with React state + listening history.
   */
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);

      if (!currentEpisode) return;

      setListeningHistory((prev) => {
        const ep = prev[currentEpisode.id] || {};

        const finished =
          audio.duration && audio.currentTime >= audio.duration - 1;

        return {
          ...prev,
          [currentEpisode.id]: {
            ...ep,
            id: currentEpisode.id,
            title: currentEpisode.title,
            showTitle: currentEpisode.showTitle,
            src: currentEpisode.src,
            lastPosition: audio.currentTime,
            duration: audio.duration || ep.duration || 0,
            finished,
            lastPlayedAt: new Date().toISOString(),
          },
        };
      });
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentEpisode]);

  /**
   * Warn user before closing tab while audio is playing.
   */
  useEffect(() => {
    const warn = (e) => {
      if (!isPlaying) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [isPlaying]);

  /**
   * Plays an episode and restores last position.
   */
  const playAudio = ({ id, src, title, showTitle }) => {
    const audio = audioRef.current;

    const isNewEpisode = !currentEpisode || currentEpisode.id !== id;

    if (isNewEpisode) {
      setCurrentEpisode({ id, src, title, showTitle });
      audio.src = src;

      const saved = listeningHistory[id];
      if (saved?.lastPosition && !saved.finished) {
        audio.currentTime = saved.lastPosition;
      } else {
        audio.currentTime = 0;
      }
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

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        currentEpisode,
        isPlaying,
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