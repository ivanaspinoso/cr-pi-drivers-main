import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByBirthdate, filterByName, filteredByOrigin, filterByTeam, getByName, getDrivers, getTeams } from '../../redux/actions/actions';
import Searchbar from '../searchbar/Searchbar';
import Drivers from '../drivers/Drivers';
import Pagination from '../Pagination/Pagination';

const Home = () => {
    const dispatch = useDispatch();
    const allDrivers = useSelector((state) => state.drivers);
    const driver = useSelector((state) => state.driver);
    console.log(driver, 'driver')

    const teamState = useSelector((state) => state.teams);

    const [currentPage, setCurrentPage] = useState(1);
    const [driversPerPage] = useState(9);
    const [selectedNameFilter, setSelectedNameFilter] = useState("");
    const [selectedOriginFilter, setSelectedOriginFilter] = useState("");
    const [selectedTeamFilter, setSelectedTeamFilter] = useState("");
    const [selectedBirthdateFilter, setSelectedBirthdateFilter] = useState("");

    const lastDriverIndex = currentPage * driversPerPage;
    const firstDriverIndex = lastDriverIndex - driversPerPage;
    const currentDrivers = allDrivers ? allDrivers.slice(firstDriverIndex, lastDriverIndex) : [];
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const resetPagination = () => {
        setCurrentPage(1);
    };

    useEffect(() => {
        dispatch(getDrivers());
        dispatch(getTeams());
    }, [dispatch]);

    const handleClick = (event) => {
        event.preventDefault();
        resetPagination();
        dispatch(getDrivers());
        dispatch(filterByName(""));
        dispatch(filterByBirthdate(""));
        dispatch(filteredByOrigin("")); // Corregido el nombre de la función
        dispatch(filterByTeam(""));
        setSelectedBirthdateFilter("");
        setSelectedNameFilter("");
        setSelectedOriginFilter("");
        setSelectedTeamFilter("");
    };

    const handleFilterByBirthdate = (event) => {
        event.preventDefault();
        resetPagination();
        setSelectedBirthdateFilter(event.target.value);
        dispatch(filterByBirthdate(event.target.value));
    };

    const handleFilteredByOrigin = (event) => {
        event.preventDefault();
        resetPagination();
        setSelectedOriginFilter(event.target.value);
        dispatch(filteredByOrigin(event.target.value)); // Corregido el nombre de la función
    };

    const handleFilterByTeams = (event) => {
        event.preventDefault();
        resetPagination();
        setSelectedTeamFilter(event.target.value);
        dispatch(filterByTeam(event.target.value));
    };

    const handleFilterByName = (event) => {
        event.preventDefault();
        resetPagination();
        setSelectedNameFilter(event.target.value);
        dispatch(filterByName(event.target.value));
    };

    const handleSearch = (search) => {
        resetPagination();
        dispatch(getByName(search));
    };

    return (
      <div >
        <div >
          <div >
            <h1 >¡Bienvenido al mundo de los conductores!</h1>
          </div>
          <div >
            <Searchbar onSearch={handleSearch} />
          </div>
          <div>
            <h3 >Ordenar:</h3>
            <div >
              <label >Alfabéticamente:</label>
              <select
              
                onChange={(event) => handleFilterByName(event)}
                value={selectedNameFilter}
              >
                <option value="">Seleccionar</option>
                <option value="Asc">Ascendente</option>
                <option value="Dec">Descendente</option>
              </select>
            </div>
            <div >
              <label >Fecha de nacimiento:</label>
              <select
                
                onChange={(event) => handleFilterByBirthdate(event)}
                value={selectedBirthdateFilter}
              >
                <option value="">Seleccionar</option>
                <option value="fecha">Fecha:</option>
              </select>
            </div>
          </div>
          <div >
            <h3>Filtrar:</h3>
            <div >
              <label >Origen:</label>
              <select
                
                onChange={(event) => handleFilteredByOrigin(event)}
                value={selectedOriginFilter}
              >
                <option value="">Seleccionar</option>
                <option value="all">Todos</option>
                <option value="api">API</option>
                <option value="created">Creado</option>
              </select>
            </div>
            <div>
              <label >Escudería:</label>
              <select
                
                onChange={(event) => handleFilterByTeams(event)}
                value={selectedTeamFilter}
              >
                <option value="">Seleccionar</option>
                <option value="All">Todas las escuderías</option>
                {teamState?.sort().map((team) => (
                  <option key={team.id} value={team.name}>
                   {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div >
            <button
             
              onClick={(event) => handleClick(event)}
            >
              Eliminar filtros
            </button>
          </div>
        </div>
        <div>
          {driver !== undefined && <Drivers
              key={driver.id}
              id={driver.id}
              name={driver.name}
              surname={driver.surname}
              nationality={driver.nationality}
              image={driver.image}
              birthdate= {driver.birthdate}
              description= {driver.description}
              teams= {driver.teams}
              createInDb={driver.createInDb}
            />}
          {currentDrivers?.map((driver) => (
            <Drivers
              key={driver.id}
              id={driver.id}
              name={driver.name}
              surname={driver.surname}
              nationality={driver.nationality}
              image={driver.image}
              birthdate= {driver.birthdate}
              description= {driver.description}
              teams= {driver.teams}
              createInDb={driver.createInDb}
            />
          ))}
        </div>
        <Pagination
 drivers={allDrivers ? allDrivers.length : 0}
 driversPerPage={driversPerPage}
 currentPage={currentPage}
 pagination={pagination}
/>
      </div>
   );
  };
  
  export default Home;
  