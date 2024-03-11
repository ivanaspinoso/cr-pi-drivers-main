import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions/actions';

const Searchbar = () => {
 const dispatch = useDispatch();
 const [searchName, setSearchName] = useState("");
 const [error, setError] = useState("");

 const handleOnChange = (event) => {
    setSearchName(event.target.value);
    setError("");
 };

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
    setSearchName("");
 };

 return (
    <div>
      <input type="text" value={searchName} onChange={handleOnChange} />
      <button onClick={handleSearch} disabled={!searchName}>
        Search
      </button>
      {error && <p>{error}</p>}
    </div>
 );
};

export default Searchbar;