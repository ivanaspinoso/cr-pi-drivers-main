import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link , useNavigate} from "react-router-dom";
import { resetDriver } from '../../redux/actions/actions';
import styles from './Nav.module.css'; // Asegúrate de que la ruta sea correcta

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [render, setRender] = useState(false)

 const handleClick = () => {
    dispatch(resetDriver());
    setRender(!render);
    navigate('/home');
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
