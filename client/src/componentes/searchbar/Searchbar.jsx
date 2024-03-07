import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getByName } from '../../redux/actions/actions';

const Searchbar = ({onSearch}) => {
  const dispatch=useDispatch();
  const [searchName,setSearchName]=useState("")
  const [error, setError]=useState("")

  const handleOnChange =(event)=>{
    setSearchName(event.target.value)
    setError("")
  }

  const handleSearch=async()=>{
    const search = searchName.trim().toLowerCase();
    if(!search){
      setError("Por favor ingrese un nombre")
      return;
    } else if(!search.match(/^[a-zA-Z\s]+$/)){
      setError("Por favor ingrese valor alfabeticos")
      return;
    }

   dispatch(getByName(search))
   .then(()=>{
    onSearch(search);
    setSearchName("");
   })
   .catch(()=>{
    setError("Ha ocurrido un error en la busqueda")
   })
  };

  return (
    <div>
      <input type="text" onChange={handleOnChange} />
      <button onClick={handleSearch} disabled={!searchName}>
        Search
      </button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Searchbar;
