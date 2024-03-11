import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { deleteDriver } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
const Drivers = ({id,name,surname,teams,dob,image, createInDb}) => {
  const[, setDeleted]=useState(false);
  const [showConfirmation,setShowConfirmation]=useState(false);
  const dispatch=useDispatch();
  let timer;

  const handleDeleteDriver=async(id)=>{
     try {
      dispatch(deleteDriver(id));
      setDeleted(true);
      setShowConfirmation(true);
      timer=setTimeout(()=>{
        setShowConfirmation(false);
        window.location.reload()
      }, 2000)
     } catch (error) {
      console.error(error)
     }
  }

  useEffect(()=>{
    return ()=>{
      clearTimeout(timer);
    }
  },[timer])
  return (
    <div >
      <div >
        <Link to={`/drivers/${id}`} >
          <h3 >{name} {surname}</h3>
        </Link>
        <div >
          <img src={image} alt={`${name} ${surname}`} />

        </div>
        <p >Fecha de nacimiento: {dob}</p>
        <p >Equipos: {teams.join(", ")}</p>
        {createInDb && (
          <button
            
            onClick={() => handleDeleteDriver(id)}
          >
            Eliminar
          </button>
        )}
        {showConfirmation && (
          <p >
            El conductor fue eliminado exitosamente
          </p>
        )}
      </div>
    </div>
  );
};

export default Drivers;