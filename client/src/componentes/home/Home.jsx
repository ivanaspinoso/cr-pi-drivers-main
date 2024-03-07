import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByBirthdate, filterByName, filterByOrigin, filterByTeam, getByName, getDrivers, getTeams } from '../../redux/actions/actions'
import Searchbar from '../searchbar/Searchbar'

const Home = () => {
    const dispatch=useDispatch()
    const allDrivers = useSelector((state)=>state.drivers)
    const teamState =useSelector((state)=>state.teams)

    const [currentPage,setCurrentPage] = useState(1);
    const [driversPerPage] = useState(9);
    const [selectedNameFilter, setSelectedNameFilter] = useState("");
    const [selectedOriginFilter, setSelectedOriginFilter]=useState("")
    const [selectedTeamFilter,setSelectedTeamFilter] = useState("");
    const [selectedBirthdateFilter, setSelectedBirthdateFilter]=useState("")

    const pagination=(pageNumber)=>{
        setCurrentPage(pageNumber);
    }

    const resetPagination=()=>{
        setCurrentPage(1)
    }

    useEffect(()=>{
        dispatch(getDrivers());
        dispatch(getTeams())
    },[dispatch]);

    const handleClick=(event)=>{
        event.prevenDefault();
        resetPagination();
        dispatch(getDrivers());
        dispatch(filterByName(""))
        dispatch(filterByBirthdate(""))
        dispatch(filterByOrigin(""));
        dispatch(filterByTeam(""))
        setSelectedBirthdateFilter("");
        setSelectedNameFilter("");
        setSelectedOriginFilter("");
        setSelectedTeamFilter("");
    }

    const handleFilterByBirthdate=(event)=>{
        event.prevenDefault();
        resetPagination();
        setSelectedBirthdateFilter(event.target.value);
        dispatch(filterByBirthdate(event.target.value));
    }

    const handleFilteredByOrigin =(event)=>{
        event.prevenDefault();
        resetPagination();
        setSelectedOriginFilter(event.target.value);
        dispatch(filterByOrigin(event.target.value))
    }

    const handleFilterByTeams=(event)=>{
        event.prevenDefault();
        resetPagination();
        setSelectedTeamFilter(event.target.value);
        dispatch(filterByTeam(event.target.value))
    }

    const handleFilterByName = (event)=>{
        event.prevenDefault();
        resetPagination();
        setSelectedNameFilter(event.target.value)
        dispatch(filterByName(event.target.value))
    }

    const handleSearch=(search)=>{
        resetPagination();
        dispatch(getByName(search))
    }

  return (
    <div>
      <div>
        <h1>¡Bienvenido!</h1>
      </div>
      <div>
        <Searchbar onSearch={handleSearch}/>
      </div>
      <div>
        <h3>Ordenar:</h3>
        <div>
            <label htmlFor="">Alfabeticamente:</label>
            <select
            onChange={(event)=> handleFilterByName(event)}
            value={selectedNameFilter}
            >
            <option value="">Seleccionar</option>
            <option value="">Ascendente</option>
            <option value="">Descendente</option>
            </select>
        </div>
        <div>
            <label htmlFor="">Peso:</label>
            <select onChange={(event)=>handleFilterByBirthdate(event)} 
            value={selectedBirthdateFilter}
            >
            <option value="">Seleccionar</option>
            <option value="">Fecha:</option>
            </select>
        </div>
      </div>
    </div>
  )
}

export default Home
