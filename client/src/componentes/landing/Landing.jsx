import React from 'react';
import { Link } from "react-router-dom";
import styles from './Landing.module.css'; // Asegúrate de que la ruta sea correcta
// En la parte superior de tu archivo Landing.js

const Landing = () => {
 return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Bienvenido a mi Driver App</h1>
        <Link to="/home" className={styles.link}>
          <button className={styles.button}>Enter</button> 
        </Link>
      </div>
    </div>
 )
}

export default Landing;
