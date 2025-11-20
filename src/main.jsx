import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
import { FavouritesProvider } from "./context/FaveContext";
import { AudioProvider } from "./context/AudioContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
     
    <PodcastProvider>
      <AudioProvider>
      <FavouritesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </FavouritesProvider>
    </AudioProvider>
    </PodcastProvider>
    
    
  </StrictMode>
);
