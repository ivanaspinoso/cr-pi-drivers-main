import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import { deleteDriverId, getById } from '../../redux/actions/actions';

const Detail = () => {
    const dispatch= useDispatch();
    let driver = useSelector((state)=>state.details);
    const [, setDriverId]=useState();
    const {id} =useParams()

    useEffect(()=>{
      dispatch(getById(id));
      setDriverId({})
      return dispatch(deleteDriverId())
    },[dispatch,id])

  return (
    <div>
      
     <h1>{driver?.name?.forename}</h1> 
     <h1> {driver?.name?.surname}</h1>
     <div>
      <img src={driver?.image?.url} alt={driver.name} />
     </div>
     <p>Team:{driver.teams}</p>
     <p>Nacionalidad:{driver.nationality}</p>
     <p>Descripcion:{driver.description}</p>
     <p>Fecha de nacimiento:{driver.birthdate}</p>
  
    </div>
  )
}

export default Detail
/*
Nombre.
Apellido.
Nacionalidad.
Imagen.
Descripción.
Fecha de Nacimiento.
Escuderías.
*/