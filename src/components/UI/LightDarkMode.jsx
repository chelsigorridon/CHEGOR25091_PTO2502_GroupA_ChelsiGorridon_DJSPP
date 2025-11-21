import { useState, useEffect } from "react";
import styles from "./LightDarkMode.module.css";

/**
 * @file LightDarkMode.jsx
 * @description Theme toggle component that switches between
 * light and dark modes and persists the user's preference
 * in localStorage.
 */

/**
 * LightDarkMode Component
 *
 * - Loads the user's saved theme from localStorage
 * - Applies the theme class ("light" or "dark") to the document body
 * - Allows users to toggle between themes
 * - Saves the selected theme so it persists across sessions
 *
 * @component
 * @returns {JSX.Element} A button that toggles the app theme.
 */

export default function LightDarkMode() {

  /** 
   * Current theme state ("light" or "dark").
   * Default is retrieved from localStorage, otherwise "light".
   */

    const [theme, setTheme]= useState (
        localStorage.getItem("theme")||"light"
    );

    
  /**
   * Applies the theme to <body> whenever it changes
   * and saves the new value in localStorage.
   */

    useEffect (()=> {
        document.body.className= theme;
        localStorage.setItem ("theme", theme);
    }, [theme]);

      /**
   * Toggles between light and dark themes.
   */


    const toggleTheme = () => {
        setTheme ((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

   return (
    <button className={styles.toggle} onClick={toggleTheme}>
       <span className={styles.icon}>
      {theme === "light" ? "☾" : "☀︎"}
      </span>
    </button>
  );
}   
    
    
