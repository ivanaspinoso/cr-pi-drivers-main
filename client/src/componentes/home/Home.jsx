import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByBirthdate, filterByName, filteredByOrigin, filterByTeam, getByName, getDrivers, getTeams } from '../../redux/actions/actions';
import Searchbar from '../searchbar/Searchbar';
import Drivers from '../drivers/Drivers';
import Pagination from '../pagination/Pagination';
import styles from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const allDrivers = useSelector((state) => state.drivers);
    const driver = useSelector((state) => state.driver);
    const driversCopy = useSelector((state) => state.driversCopy);
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

    useEffect(() => {
        dispatch(getDrivers());
        dispatch(getTeams());
    }, [])

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
        // Restablece los filtros en el estado de Redux
        dispatch(filterByBirthdate(""));
        dispatch(filterByTeam(""));
        dispatch(filteredByOrigin(""));
        dispatch(filterByName(""));
        // Restablece los estados locales
        setSelectedBirthdateFilter("");
        setSelectedNameFilter("");
        setSelectedOriginFilter("");
        setSelectedTeamFilter("");
        // Despacha una acción para obtener los drivers basados en el estado actual de Redux
        dispatch(getDrivers());
    };
    

    const handleChange = (e) => {
        const val = e.target.value;
        dispatch(filterByName(val));
    };

    const handleFilteredByOrigin = (event) => {
        event.preventDefault();
        resetPagination();
        setSelectedOriginFilter(event.target.value);
        dispatch(filteredByOrigin(event.target.value));
    };

    const handleFilterByBirthdate = (event) => {
        event.preventDefault();
        resetPagination();
        setSelectedBirthdateFilter(event.target.value);
        dispatch(filterByBirthdate(event.target.value));
    };

    const handleFilterByName = (event) => {
        event.preventDefault();
        resetPagination();
        setSelectedNameFilter(event.target.value);
        dispatch(filterByName(event.target.value));
    };

    const handleFilterByTeam = (event) => {
        event.preventDefault();
        resetPagination();
        setSelectedTeamFilter(event.target.value);
        dispatch(filterByTeam(event.target.value));
    };

    const handleSearch = (search) => {
        resetPagination();
        console.log('handlesearch')
        dispatch(getByName(search));
    };

    return (
        <div className={styles.homeAll} >
            <div className={styles.homeContainer}>
            
                <div className={styles.titleContainer}>
               
                    <h1 className={styles.title}>¡Bienvenido!</h1>
                </div>
                <div className={styles.driversContainer}>
                    <Searchbar onSearch={handleSearch} />
                </div>
                
                <div className={styles.filterContainer}>
                    <h3>Ordenar:</h3>
                    <div className={styles.filterOption}>
                        <label className={styles.filterLabel}>Alfabéticamente:</label>
                        <select
                            className={styles.filterSelect}
                            onChange={(event) => handleFilterByName(event)}
                            value={selectedNameFilter}
                        >
                            <option value="">Seleccionar</option>
                            <option value="asc">Ascendente A-Z</option>
                            <option value="desc">Descendente Z-A</option>
                        </select>
                    </div>
                    <div className={styles.filterOption}>
                        <label className={styles.filterLabel}>Fecha de nacimiento:</label>
                        <select
                            className={styles.filterSelect}
                            onChange={(event) => handleFilterByBirthdate(event)}
                            value={selectedBirthdateFilter}
                        >
                            <option value="">Seleccionar</option>
                            <option value="sin orden">Sin orden</option>
                            <option value="asc">Birthday Asc</option>
                            <option value="desc">Birthday Desc</option>
                        </select>
                    </div>
                </div>
                <div className={styles.filterContainer}>
                    <h3>Filtrar:</h3>
                    <div className={styles.filterOption}>
                        <label className={styles.filterLabel}>Origen:</label>
                        <select
                            className={styles.filterSelect}
                            onChange={(event) => handleFilteredByOrigin(event)}
                            value={selectedOriginFilter}
                        >
                            <option value="">Seleccionar</option>
                            <option value="all">Todos</option>
                            <option value="api">API</option>
                            <option value="created">Creado</option>
                        </select>
                    </div>
                    <div className={styles.filterOption}>
                        <label className={styles.filterLabel}>Escudería:</label>
                        <select
                            className={styles.filterSelect}
                            onChange={(event) => handleFilterByTeam(event)}
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
                <div className={styles.reloadButtonContainer}>
                    <button
                        className={styles.reloadButton}
                        onClick={(event) => handleClick(event)}
                    >
                        Eliminar filtros
                    </button>
                </div>
            </div>
           
            <div>
            {driver?.length >= 1 ? (
    driver.map((driverItem) => (
        <Drivers
            key={driverItem.id}
            id={driverItem.id}
            forename={driverItem.forename}
            surname={driverItem.surname}
            nationality={driverItem.nationality}
            image={driverItem.image.url}
            dob={driverItem.dob}
            description={driverItem.description}
            teams={driverItem.teams}
            createInDb={driverItem.createInDb}
        />
    ))
) : (
    currentDrivers.map((driver) => (
        <Drivers
            key={driver.id}
            id={driver.id}
            forename={driver.forename}
            surname={driver.surname}
            nationality={driver.nationality}
            image={driver.image.url}
            dob={driver.dob}
            description={driver.description}
            teams={driver.teams}
            createInDb={driver.createInDb}
        />
    ))
)}
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
