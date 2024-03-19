import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions/actions';
import styles from './Searchbar.module.css'; // Asegúrate de que la ruta sea correcta

const Searchbar = () => {
 const dispatch = useDispatch();
 const [searchName, setSearchName] = useState(""); //almacena el valor actual de la barra de busqueda
 const [error, setError] = useState(""); //almacena algun tipo de error

 //se llama cada vez que el usuario escribe en la barra de busqueda. Actualiza el estado searchName con el valor actual y limpia cualquier mensaje de error existente
 //manejo del cambio en la barra de busqueda:
 const handleOnChange = (event) => {
    setSearchName(event.target.value);
    setError("");
 };

 //se llama cuando el usuario hace clic en el boton de busqueda. Primero verifica si el valor de busqueda esta vacio o si contiene caracteres no alfabeticos, si la busqueda es valida, despacha la accion getByName 
 //manejo de la busqueda:
 const handleSearch = () => {
    const search = searchName.trim();
    if (!search) {
      setError("Por favor ingrese un nombre");
      return;
    } else if (!search.match(/^[a-zA-Z\s]+$/)) {
      setError("Por favor ingrese valor alfabéticos");
      return;
    }

    dispatch(getByName(search));
    setSearchName("");//limpia la busqueda
 };

 return (
    <div className={styles.SearchBarContainer}>
      <input
        type="text"
        value={searchName}
        onChange={handleOnChange}
        className={styles.SearchInput}
      />
      <button
        onClick={handleSearch}
        disabled={!searchName}
        className={styles.SearchButton}
      >
        Search
      </button>
      {error && <p className={styles.Error}>{error}</p>}
    </div>
 );
};

export default Searchbar;