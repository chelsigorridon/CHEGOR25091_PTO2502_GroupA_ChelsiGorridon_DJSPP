import styles from "./Header.module.css";
import LightDarkMode from "./LightDarkMode.jsx";
import { Link } from "react-router-dom";

export default function Header() {
  return (
     
    <header className={styles.appHeader}>
      <h1>
      {" "}
    <Link to="/">
         <img
         src="./img/Favicon.png"
          alt="Podcast App Logo"
          className={styles.logo}
          />
         Podcast App </Link>
      </h1>

     <LightDarkMode/>

    </header>

  );
}
