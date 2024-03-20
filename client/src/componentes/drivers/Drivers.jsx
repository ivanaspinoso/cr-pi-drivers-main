import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteDriver } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import styles from './Drivers.module.css';

//se define el componente drivers, que recibe props
const Drivers = ({ id, forename, surname, teams, dob, image, createInDb }) => {
  //se inicializan los estados locales deleted y showConfirmation utiliznado el hook useState
 const [deleted, setDeleted] = useState(false);
 const [showConfirmation, setShowConfirmation] = useState(false);
 const dispatch = useDispatch();

 //se define la funcion handleDeleteDriver utilizando el hook useCallback para manejar la eliminacion del conductor 
 const handleDeleteDriver = useCallback(async (id) => {
    try {
      await dispatch(deleteDriver(id));
      setDeleted(true);// se establece en true para mostrar mensaje
      setShowConfirmation(true); //muestra el mensaje de confirmacion
    } catch (error) {
      console.error(error);
    }
 }, [dispatch]); //se ejecuta cuando cambia dispatch

 useEffect(() => {
    if (deleted) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);//oculta el mensaje de confirmacion
       
      }, 2000);
      return () => clearTimeout(timer);
    }
 }, [deleted]); //se ejecuta cuando cambia deleted

 return (
  <Link to={`/drivers/${id}`} className={styles.link}>
      <div className={styles.driverCard}>
          <div className={styles.content}>
              <h3 className={styles.title}>{forename} {surname}</h3>
              <div className={styles.imageContainer}>
                  <img className={styles.image} src={image} alt={`${forename} ${surname}`} />
              </div>
              <p className={styles.info}>Fecha de nacimiento: {dob}</p>
               <p className={styles.teams}>Equipos: {teams?.join(", ")}</p> 
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
  </Link>
);
};
export default Drivers;