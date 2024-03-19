import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { resetDriver } from '../../redux/actions/actions';
import styles from './Nav.module.css'; // Asegúrate de que la ruta sea correcta

const Nav = () => {
  const dispatch = useDispatch(); 
  const [render, setRender] = useState(false)

  const handleClick = () => {
    setRender(!render)
    dispatch(resetDriver())
    window.location.reload()

  }

  useEffect(() => {
dispatch(resetDriver())
}, [render])

 return (
    <div className={styles.nav}>
      <nav>
       
        <Link to="/home">
          <button onClick={handleClick} className={styles.link}>
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
