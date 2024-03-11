import React from 'react';
import { Link } from "react-router-dom";
import styles from './Nav.module.css'; // Asegúrate de que la ruta sea correcta

const Nav = () => {
 return (
    <div className={styles.nav}>
      <nav>
        <Link to="/">
          <button className={styles.link}> Landing </button>
        </Link>
        <Link to="/home">
          <button className={styles.link}>
            Home
          </button>
        </Link>
        <Link to="/form">
          <button className={styles.link}>Crear un nuevo conductor</button>
        </Link>
      </nav>
    </div>
 )
}

export default Nav;
