const { Driver, Team } = require('./../db');
const axios = require("axios");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const postDrivers = async (
  forename,
  surname,
  image,
  description,
  nationality,
  dob,
  teams
) => {
  const apiUrl = "http://localhost:5000/drivers";
  const toLowForname = forename ? forename.toLowerCase() : ''; // Convertir el nombre a minúsculas si está presente
  const toLowSurname = surname ? surname.toLowerCase() : '';// Convertir el apellido a minúsculas si está presente
  const toLowNationality = nationality ? nationality.toLowerCase() : ''; //convertir la nacionalidad a minusculas si esta presente

  //filtra los conductores en la base de datos local que coincidan con los parametros proporcionados 
  const filteredDB = await Driver.findAll({
    where: {
      forename: { [Op.iLike]: `%${toLowForname}%` },
      surname: { [Op.iLike]: `%${toLowSurname}%` },
      nationality: { [Op.iLike]: `%${toLowNationality}%` },
    },
  });

  //realiza una solicitud GET a la API externa y obtener la respuesta
  const resp = await axios.get(`${apiUrl}`);
  //filtrar los objetos coincidentes en la respuesta de la API
  const matchingObjects = resp.data.filter((obj) => {
    return (
      obj.forename?.toLowerCase() === forename?.toLowerCase() &&
      obj.surname?.toLowerCase() === surname?.toLowerCase() &&
      obj.nationality?.toLowerCase() === nationality?.toLowerCase() &&
      obj.dob === dob
    );
  });

  //si no hay conductores coincidentes en la base de datos local y en la API
  if (matchingObjects.length === 0 && filteredDB.length === 0) {
    //crea un nuevo conductor en la base de datos local
    const newDriver = await Driver.create({
      forename,
      surname,
      image,
      description,
      nationality,
      dob,
      teams: 'Default Team', // Asigna un equipo predeterminado si no se proporciona ninguno
    });
    
    // Busca el equipo por nombre
    const defaultTeam = await Team.findOne({ where: { name: 'Default Team' } });
    // Asocia el conductor con el equipo predeterminado
    await newDriver.addTeam(defaultTeam);

    return newDriver;
  } else {
    throw new Error("That driver already exists");
  }
};

module.exports = postDrivers;
