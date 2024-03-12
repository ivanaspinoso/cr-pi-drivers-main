import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeams, postDriver } from '../../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

// const Form = () => {
//   const crearButtonRef = useRef(null);
//   const dispatch = useDispatch();
//   const [input, setInput] = useState({
//     id: '',
//     name: '',
//     lastName: '',
//     nationality: '',
//     image: '',
//     dob: '',
//     description: '',
//     teams: [],
//   });

//   useEffect(() => {
//     dispatch(getTeams());
//   }, [dispatch]);

//   const teams = useSelector((state) => state.teams);
//   const [selectedTeams, setSelectedTeams] = useState([]);
//   const [errors, setErrors] = useState({});

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setInput((prevInput) => ({
//       ...prevInput,
//       [name]: value,
//     }));
//   };

//   const handleSelect = (event) => {
//     const selectedTeam = event.target.value;
//     const selectedTeamObject = teams.find((team) => team.name === selectedTeam);
   
//     if (
//        !selectedTeams.some((team) => team.name === selectedTeam)
//     ) {
//        setInput((prevInput) => ({
//          ...prevInput,
//          teams: [...prevInput.teams, selectedTeamObject], // Agrega el objeto completo del equipo
//        }));
//        setSelectedTeams((prevSelectedTeams) => [...prevSelectedTeams, selectedTeamObject]);
//     } else {
//        setErrors((prevErrors) => ({
//          ...prevErrors,
//          teams: 'Este equipo ya ha sido seleccionado',
//        }));
//     }
//    };
   

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const driver = {
//       ...input,
//       teams: input.teams.map((team) => team.name),
//     };
//     dispatch(postDriver(driver));
//     setInput({
//       id: '',
//       name: '',
//       lastName: '',
//       nationality: '',
//       image: '',
//       dob: '',
//       description: '',
//       teams: [],
//     });
//     setSelectedTeams([]);
//   };

//   const handleRemove = (team) => {
//     setSelectedTeams((prevSelectedTeams) => prevSelectedTeams.filter((t) => t !== team));
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Nombre:</label>
//           <input
//             type="text"
//             value={input.name}
//             name="name"
//             onChange={handleChange}
//             placeholder="Nombre del conductor"
//           />
//         </div>
//         <div>
//           <label>Apellido:</label>
//           <input
//             type="text"
//             value={input.lastName}
//             name="lastName"
//             onChange={handleChange}
//             placeholder="Apellido del conductor"
//           />
//         </div>
//         <div>
//           <label>Nacionalidad:</label>
//           <input
//             type="text"
//             value={input.nationality}
//             name="nationality"
//             onChange={handleChange}
//             placeholder="Nacionalidad del conductor"
//           />
//         </div>
//         <div>
//           <label>Fecha de Nacimiento:</label>
//           <input
//             type="date"
//             value={input.dob}
//             name="dob"
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Descripción:</label>
//           <textarea
//             value={input.description}
//             name="description"
//             onChange={handleChange}
//             placeholder="Descripción del conductor"
//           />
//         </div>
//         <div>
//           <label>Imagen URL:</label>
//           <input
//             type="text"
//             value={input.image}
//             name="image"
//             onChange={handleChange}
//             placeholder="URL de la imagen"
//           />
//         </div>
//         <div>
//           <label>Equipo:</label>
//           <select id="teams" onChange={handleSelect}>
//             <option value="">Seleccionar</option>
//             {teams.map((team) => (
//               <option key={team.id} value={team.name}>
//                 {team.name}
//               </option>
//             ))}
//           </select>
//           <div>
//             {selectedTeams.map((team) => (
//               <div key={team.id}>
//                 <span>{team.name}</span>
//                 <button type="button" onClick={() => handleRemove(team)}>
//                   Eliminar
//                 </button>
//               </div>
//             ))}
//           </div>
//           {errors.teams && <p>{errors.teams}</p>}
//         </div>
//         <button type="submit" ref={crearButtonRef}>
//           Crear
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Form;
const validacion = (input) => {
  let errors = {};
  const regexTexto = /^[a-zA-Z]{2,}$/;
  const regexImagen = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

  if (!regexTexto.test(input.name)) {
      errors.name = "El nombre debe contener solo letras";
  }
  if (!regexTexto.test(input.lastname)) {
      errors.lastname = "El apellido debe contener solo letras";
  }
  if (!regexTexto.test(input.nationality)) {
      errors.nationality = "La nacionalidad debe contener solo letras";
  }
  if (input.description.length < 10) {
      errors.description = "La descripción debe ser más larga";
  }
  if (!regexImagen.test(input.image)) {
      errors.image = "La url no es válida";
  }
  if (!input.dob) {
      errors.dob = "El campo de nacimiento es obligatorio"
  } else {
      const birthDate = new Date(input.dob);
      const currentDate = new Date();
      const diffYears = currentDate.getFullYear() - birthDate.getFullYear()

      if (diffYears < 13) {
          errors.dob = 'La fecha de nacimiento debe ser de una antigüedad no menor a 13 años';
      }
  }
  if (!input.teams || input.teams.length === 0) {
      errors.teams = 'Debe seleccionar al menos una escudería';
  }
  return errors;
};

export default function Form() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(getTeams());
  }, []);

  const allTeams = useSelector((state) => state.teams);

  const [driver, setDriver] = useState({
      name: "",
      lastname: "",
      nationality: "",
      image: "",
      dob: "",
      description: "",
      teams: []
  });

  const [errors, setErrors] = useState({
      name: "",
      lastname: "",
      nationality: "",
      image: "",
      dob: "",
      description: "",
      teams: ""
  });

  const handleChange = (e) => {

      const { name, value } = e.target;

      if (name === 'teams') {

          if (value === '--Escuderías--') {
              return;
          }

          if (!driver.teams.includes(value)) {
              setDriver(prevState => ({
                  ...prevState,
                  teams: [...prevState.teams, value]
              }));
              setErrors(validacion({
                  ...driver,
                  teams: [...driver.teams, value]
              }));
          }

      } else {

          setDriver({
              ...driver,
              [name]: value,
          });

          setErrors(
              validacion({
                  ...driver,
                  [name]: value,
              })
          );

      }

  };

  const handleRemove = (team) => (e) => {
      e.preventDefault();
      setDriver(prevState => ({
          ...prevState,
          teams: prevState.teams.filter(escuderia => escuderia !== team)
      }));
      setErrors(validacion({
          ...driver,
          teams: driver.teams.filter(escuderia => escuderia !== team)
      }));
  }

  const disableButton = () => {

      const formIsEmpty = Object.values(driver).some(value => value === "");

      const hasErrors = Object.values(errors).some(error => error !== "");

      return formIsEmpty || hasErrors;
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(postDriver(driver));
      navigate('/home');
  };

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <label>Nombre : </label>
              <input onChange={handleChange} name="name" type="text" />
              {errors.name ? <label>{errors.name}</label> : null}
              <label>Apellido : </label>
              <input onChange={handleChange} name="lastname" type="text" />
              {errors.lastname ? <label>{errors.lastname}</label> : null}
              <label>Nacionalidad : </label>
              <input onChange={handleChange} name="nationality" type="text" />
              {errors.nationality ? <label>{errors.nationality}</label> : null}
              <label>Imagen : </label>
              <input onChange={handleChange} name="image" type="text" />
              {errors.image ? <label>{errors.image}</label> : null}
              <label>Fecha de Nacimiento : </label>
              <input onChange={handleChange} name="birthday" type="date" />
              {errors.dob ? <label>{errors.dob}</label> : null}
              <label>Descripción : </label>
              <input onChange={handleChange} name="description" type="text" />
              {errors.description ? <label>{errors.description}</label> : null}
              <div>
                  <label>Escuderías : </label>
                  <select onChange={handleChange} name="teams">
                      <option value="--Escuderías--">--Escuderías--</option>
                      {[...allTeams].sort((a, b) => a.name.localeCompare(b.name)).map(team => (
                          <option key={team.id} value={team.name}>
                              {team.name}
                          </option>
                      ))}
                  </select>
                  <div>
                      <h3>Escuderías seleccionadas : </h3>
                      {driver.teams.map((team, index) => (
                          <div key={index}>
                              <p>{team}</p>
                              <button onClick={handleRemove(team)}>X</button>
                          </div>
                      ))}
                  </div>
              </div>
              {errors.teams ? <label>{errors.teams}</label> : null}
              <input type="submit" disabled={disableButton()} />
          </form>
      </div>
  );
}

