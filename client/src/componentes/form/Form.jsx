import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams, postDriver } from '../../redux/actions/actions';

const Form = () => {
  const crearButtonRef = useRef(null);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    id: '',
    name: '',
    lastName: '',
    nationality: '',
    image: '',
    birthdate: '',
    description: '',
    teams: [],
  });

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const teams = useSelector((state) => state.teams);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSelect = (event) => {
    const selectedTeam = event.target.value;
    const selectedTeamObject = teams.find((team) => team.name === selectedTeam);

    if (
      !input.teams.includes(selectedTeam) &&
      !selectedTeams.some((team) => team.name === selectedTeam)
    ) {
      setInput((prevInput) => ({
        ...prevInput,
        teams: [...prevInput.teams, selectedTeam],
        teams: [...prevInput.teams, selectedTeamObject],
      }));
      setSelectedTeams((prevSelectedTeams) => [...prevSelectedTeams, selectedTeamObject]);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        teams: 'Este equipo ya ha sido seleccionado',
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const driver = {
      ...input,
      teams: input.teams.map((team) => team.name),
    };
    dispatch(postDriver(driver));
    setInput({
      id: '',
      name: '',
      lastName: '',
      nationality: '',
      image: '',
      birthdate: '',
      description: '',
      teams: [],
    });
    setSelectedTeams([]);
  };

  const handleRemove = (team) => {
    setSelectedTeams((prevSelectedTeams) => prevSelectedTeams.filter((t) => t !== team));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
            placeholder="Nombre del conductor"
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={input.lastName}
            name="lastName"
            onChange={handleChange}
            placeholder="Apellido del conductor"
          />
        </div>
        <div>
          <label>Nacionalidad:</label>
          <input
            type="text"
            value={input.nationality}
            name="nationality"
            onChange={handleChange}
            placeholder="Nacionalidad del conductor"
          />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            value={input.birthdate}
            name="birthdate"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={input.description}
            name="description"
            onChange={handleChange}
            placeholder="Descripción del conductor"
          />
        </div>
        <div>
          <label>Imagen URL:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
            placeholder="URL de la imagen"
          />
        </div>
        <div>
          <label>Equipo:</label>
          <select id="teams" onChange={handleSelect}>
            <option value="">Seleccionar</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <div>
            {selectedTeams.map((team) => (
              <div key={team.id}>
                <span>{team.name}</span>
                <button type="button" onClick={() => handleRemove(team)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          {errors.teams && <p>{errors.teams}</p>}
        </div>
        <button type="submit" ref={crearButtonRef}>
          Crear
        </button>
      </form>
    </div>
  );
};

export default Form;
