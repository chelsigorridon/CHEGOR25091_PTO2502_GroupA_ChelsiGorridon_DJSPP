import styles from "./Header.module.css";
import LightDarkMode from "./LightDarkMode.jsx";
import { Link } from "react-router-dom";

/**
 * @file Header.jsx
 * @description Main application header component.  
 * Displays the site logo, navigation link to favourites,  
 * and the Light/Dark mode toggle.  
 * Appears on every page of the app.
 */


/**
 * Header Component
 *
 * Renders the top navigation bar used across the entire app.
 * Includes:
 * - App logo that links back to the home page
 * - Favourites button (💙)
 * - Light/Dark theme toggle
 *
 * @component
 * @returns {JSX.Element} The rendered header layout.
 */

export default function Header() {
  return (
     
    <header className={styles.appHeader}>
      <h1>
      {" "}
    <Link to="/">
         <img
         src="/img/Favicon.png"
          alt="Podcast App Logo"
          className={styles.logo}
          />
            Podcast App
          </Link>
        </h1>

        <div className={styles.headerRight}>
         <Link to="/favourites" className={styles.favebtn}>
          💙
        </Link>
  
         <LightDarkMode />
        </div>
  

    </header>

  );
}
