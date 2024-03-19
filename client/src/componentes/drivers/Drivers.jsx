import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteDriver } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import styles from './Drivers.module.css';


const Drivers = ({ id, forename, surname, teams, dob, image, createInDb }) => {
 const [deleted, setDeleted] = useState(false);
 const [showConfirmation, setShowConfirmation] = useState(false);
 const dispatch = useDispatch();

 const handleDeleteDriver = useCallback(async (id) => {
    try {
      await dispatch(deleteDriver(id));
      setDeleted(true);
      setShowConfirmation(true);
    } catch (error) {
      console.error(error);
    }
 }, [dispatch]);

 useEffect(() => {
    if (deleted) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
       
      }, 2000);
      return () => clearTimeout(timer);
    }
 }, [deleted]);

 return (
    <div className={styles.driverCard}>
      
      <div className={styles.content}>
        
        <Link to={`/drivers/${id}`} className={styles.link}>
          <h3 className={styles.title}>{forename} {surname}</h3>
        </Link>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={image} alt={`${forename} ${surname}`} />
        </div>
        <p className={styles.info}>Fecha de nacimiento: {dob}</p>
        {/* <p className={styles.teams}>Equipos: {teams.join(", ")}</p> */}
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