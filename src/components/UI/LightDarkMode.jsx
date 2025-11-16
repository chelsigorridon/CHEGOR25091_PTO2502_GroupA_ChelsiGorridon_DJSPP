import { useState, useEffect } from "react";


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
    <button  onClick={toggleTheme}>
      {theme === "light" ? "🌕" : "☀️"}
    </button>
  );
}   
    
    
