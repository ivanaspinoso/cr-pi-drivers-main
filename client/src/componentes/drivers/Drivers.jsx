import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteDriver } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import styles from './Drivers.module.css'; // Asegúrate de que la ruta sea correcta

const Drivers = ({ id, name, surname, teams, dob, image, createInDb }) => {
 const [, setDeleted] = useState(false);
 const [showConfirmation, setShowConfirmation] = useState(false);
 const dispatch = useDispatch();
 let timer;

 const handleDeleteDriver = async (id) => {
    try {
      dispatch(deleteDriver(id));
      setDeleted(true);
      setShowConfirmation(true);
      timer = setTimeout(() => {
        setShowConfirmation(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
 };

 useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
 }, [timer]);

 return (
    <div className={styles.driverCard}>
      <div className={styles.content}>
        <Link to={`/drivers/${id}`} className={styles.link}>
          <h3 className={styles.title}>{name} {surname}</h3>
        </Link>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={image} alt={`${name} ${surname}`} />
        </div>
        <p className={styles.info}>Fecha de nacimiento: {dob}</p>
        <p className={styles.teams}>Equipos: {teams.join(", ")}</p>
        {createInDb && (
          <button onClick={() => handleDeleteDriver(id)}>
            Eliminar
          </button>
        )}
        {showConfirmation && (
          <p className={styles.confirmationMessage}>
            El conductor fue eliminado exitosamente
          </p>
        )}
      </div>
    </div>
 );
};

export default Drivers;
