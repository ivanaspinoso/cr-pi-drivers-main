import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams, postDriver } from '../../redux/actions/actions';
import { validate } from "../extras/validate";

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
    const [filter, setFilter] = useState("");

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
        const selectedTeamId = event.target.value;
        const selectedTeamObject = teams.find((team) => team.id === selectedTeamId);

        if (selectedTeamObject && !input.teams.includes(selectedTeamId)) {
            setInput((prevInput) => ({
                ...prevInput,
                teams: [...prevInput.teams, selectedTeamId],
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

    const handleRemove = (teamToRemove) => {
        setInput((prevInput) => ({
            ...prevInput,
            teams: prevInput.teams.filter((id) => id !== teamToRemove.id),
            filterTeams: prevInput.filterTeams.filter((team) => team.id !== teamToRemove.id),
        }));
        setSelectedTeam((prevSelectedTeams) =>
            prevSelectedTeams.filter((team) => team.id !== teamToRemove.id)
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const driver = {
            ...input,
            filterTeams: input.filterTeams.map((team) => team.name),
        };
        dispatch(postDriver(driver));
        setInput({
            forename: "",
            surname: "",
            nationality: "",
            image: "",
            dob: "",
            description: "",
            teams: [],
            filterTeams: [],
        });
        setSelectedTeam([]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="forename"
                        value={input.forename}
                        onChange={handleChange}
                    />
                    {errors.forename && <p>{errors.forename}</p>}
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="surname"
                        value={input.surname}
                        onChange={handleChange}
                    />
                    {errors.surname && <p>{errors.surname}</p>}
                </div>
                <div>
                    <label>Nacionalidad:</label>
                    <input
                        type="text"
                        name="nationality"
                        value={input.nationality}
                        onChange={handleChange}
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
                    />
                    {errors.description && <p>{errors.description}</p>}
                </div>
                <div>
                    <label>Escuderías:</label>
                    <select name="teams" onChange={handleSelect}>
                        <option value="">Seleccionar escuderia</option>
                        {filteredTeams?.map((team) => (
                            <option key={team.id} value={team.id}>
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
            </form>
        </div>
    );
};
