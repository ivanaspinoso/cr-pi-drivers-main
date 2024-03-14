import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams, postDriver } from '../../redux/actions/actions';
import {validate} from "../extras/validate"

export const Form = () => {
    const crearButtonRef = useRef(null);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        forename: "",
        surname: "",
        nationality: "",
        image: "",
        dob: "",
        description: "",
        teams: [],
        filterTeams: [], // Se guardan los equipos filtrados
    });

    useEffect(() => {
        dispatch(getTeams());
    }, [dispatch]);

    const teams = useSelector((state) => state.teams);
    const [selectedTeam, setSelectedTeam] = useState([]);
    const [errors, setErrors] = useState({});
    const [filter, setFilter] = useState(""); // Corregido para usar useState

    const filteredTeams = teams?.filter((team) =>
        team.name.toLowerCase().includes(filter.toLowerCase())
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));

        const updatedErrors = { ...errors, [name]: validate(name, value) };
        setErrors(updatedErrors);
    };

    useEffect(() => {
        const hasErrors = Object.values(errors).some((error) => !!error);
        crearButtonRef.current.disabled = hasErrors;
    }, [errors]);

    const handleSelect = (event) => {
        const selectedTeams = event.target.value;
        const selectedTeamObject = teams.find(
            (team) => team.name === selectedTeams
        );

        if (!input.teams.includes(selectedTeams) && !selectedTeam.some((team) => team.name === selectedTeams)) {
            setInput((prevInput) => ({
                ...prevInput,
                teams: [...prevInput.teams, selectedTeams],
                filterTeams: [...prevInput.filterTeams, selectedTeamObject],
            }));
            setSelectedTeam((prevSelectedTeams) => [
                ...prevSelectedTeams,
                selectedTeamObject,
            ]);
            setErrors((prevErrors) => ({
                ...prevErrors,
                filterTeams: "",
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                filterTeams: "Este equipo ya ha sido seleccionado",
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const driver = {
            ...input,
            filterTeams: input.filterTeams.map((team) => team.name),
        }
        dispatch(postDriver(driver))
        setInput({
            forename: "",
            surname: "",
            nationality: "",
            image: "",
            dob: "",
            description: "",
            teams: [],
            filterTeams: [],
        })
        setSelectedTeam([])
    }

    const handleRemove = (teams) => {
        setSelectedTeam((prevSelectedTeams) =>
            prevSelectedTeams.filter((tea) => tea !== teams))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Registrar Conductor</h1>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="forename" // Cambiado a forename
                            value={input.forename} // Cambiado a forename
                            onChange={handleChange}
                            placeholder="Nombre del conductor"
                        />
                        {errors.forename && <p>{errors.forename}</p>} // Cambiado a forename
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input
                            type="text"
                            name="surname" // Cambiado a surname
                            value={input.surname} // Cambiado a surname
                            onChange={handleChange}
                            placeholder="Apellido del conductor"
                        />
                        {errors.surname && <p>{errors.surname}</p>} // Cambiado a surname
                    </div>
                    <div>
                        <label>Nacionalidad:</label>
                        <input
                            type="text"
                            name="nationality"
                            value={input.nationality}
                            onChange={handleChange}
                            placeholder="Nacionalidad del conductor"
                        />
                        {errors.nationality && <p>{errors.nationality}</p>}
                    </div>
                    <div>
                        <label>Imagen:</label>
                        <input
                            type="text"
                            name="image"
                            value={input.image}
                            onChange={handleChange}
                            placeholder="URL de la imagen del conductor"
                        />
                        {errors.image && <p>{errors.image}</p>}
                    </div>
                    <div>
                        <label>Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            name="dob"
                            value={input.dob}
                            onChange={handleChange}
                        />
                        {errors.dob && <p>{errors.dob}</p>}
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <textarea
                            name="description"
                            value={input.description}
                            onChange={handleChange}
                            placeholder="Descripción del conductor"
                        />
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    <div>
                        <label>Escuderías:</label>
                        <select
                            name="teams"
                            onChange={handleSelect}
                        >
                            <option value="">Seleccionar escuderia</option>
                            {filteredTeams?.map((team) => (
                                <option key={team.id} value={team.name}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                        {errors.teams && <p>{errors.teams}</p>}
                    </div>
                    <div>
                        <h3>Escuderías seleccionadas:</h3>
                        {selectedTeam.map((team, index) => (
                            <div key={index}>
                                <p>{team.name}</p>
                                <button onClick={() => handleRemove(team)}>X</button>
                            </div>
                        ))}
                    </div>
                    <button type="submit" ref={crearButtonRef}>
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    );
                        }    