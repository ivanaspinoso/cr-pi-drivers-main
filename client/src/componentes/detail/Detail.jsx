import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from '../../redux/actions/actions';
import styles from './Detail.module.css'; // Asegúrate de que la ruta sea correcta

const Detail = () => {
    const dispatch = useDispatch();
    const driver = useSelector((state) => state.details);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getById(id));
    }, [dispatch, id]);

    if (!driver) {
        return <div>Cargando detalles del conductor...</div>;
    }

    // Descomponiendo driver.name si es un objeto
    const { forename, surname } = driver.name || {};

    return (
        <div className={styles.contentContainer}>
            <h1 className={styles.titleName}>{surname}</h1>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={driver.image.url} alt={`${forename} ${surname}`} />
            </div>
            <p className={styles.info}>Team: {driver.teams}</p>
            <p className={styles.info}>Nacionalidad: {driver.nationality}</p>
            <p className={styles.info}>Descripción: {driver.description}</p>
            <p className={styles.info}>Fecha de nacimiento: {driver.dob}</p>
        </div>
    );
};

export default Detail;