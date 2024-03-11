import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from '../../redux/actions/actions';

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
        <div>
            <h1>{surname}</h1>
            <div>
                <img src={driver.image.url} alt={`${forename} ${surname}`} />
            </div>
            <p>Team: {driver.teams}</p>
            <p>Nacionalidad: {driver.nationality}</p>
            <p>Descripción: {driver.description}</p>
            <p>Fecha de nacimiento: {driver.dob}</p>
        </div>
    );
};

export default Detail;
