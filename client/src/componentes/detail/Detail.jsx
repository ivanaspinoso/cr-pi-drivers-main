import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from '../../redux/actions/actions';
import styles from './Detail.module.css'; // Asegúrate de que la ruta sea correcta

const Detail = () => {
    //inicializo los hooks useDispatch,useSelector,useParams para obtener el despachador, el selector de Redux y los parametros de la URL respectivamente
    const dispatch = useDispatch(); //hook para obtener el despachador
    const driver = useSelector((state) => state.details); //hook para obtener el estado del conductor desde Redux
    const { id } = useParams();//hook para obtener los parametros de la URL

    //se utiliza useEffect para despachar la accion getById cuando el componente se monta o el id cambia
    useEffect(() => {
        dispatch(getById(id)); //despacha la accion con el id como argumento
    }, [dispatch, id]); //se ejecuta cuando cambia dispatch o id

    //se verifica si el conductor esta cargando, si no se recibio la informacion, muestra un mensaje de carga
    if (!driver) {
        return <div>Cargando detalles del conductor...</div>;
    }

    // Descomponiendo driver.name si es un objeto para obtener el nombre y apellido del conductor
    const { forename, surname } = driver || {};

    return (
        <div className={styles.contentContainer}>
            
            <h1 className={styles.titleName}>{forename} {surname}</h1>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={driver.image?.url} alt={`${forename} ${surname}`} />
            </div>
            <p className={styles.info}>Team: {driver.teams}</p>
            <p className={styles.info}>Nacionalidad: {driver.nationality}</p>
            <p className={styles.info}>Descripción: {driver.description}</p>
            <p className={styles.info}>Fecha de nacimiento: {driver.dob}</p>
        </div>
    );
};

export default Detail;