import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { PodcastProvider } from "./context/PodcastContext";
import { FavouritesProvider } from "./context/FaveContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
     
    <PodcastProvider>
      <FavouritesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </FavouritesProvider>
    </PodcastProvider>
    
  </StrictMode>
);
