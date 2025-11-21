import { useState, useEffect } from "react";
import styles from "./LightDarkMode.module.css";


export default function LightDarkMode() {

    const [theme, setTheme]= useState (
        localStorage.getItem("theme")||"light"
    );

    useEffect (()=> {
        document.body.className= theme;
        localStorage.setItem ("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme ((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

   return (
    <button className={styles.toggle} onClick={toggleTheme}>
       <span className={styles.icon}>
      {theme === "light" ? "🌕" : "☀️"}
      </span>
    </button>
  );
}   
    
    
