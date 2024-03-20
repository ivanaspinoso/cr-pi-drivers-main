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
  const toLowForname = forename ? forename.toLowerCase() : '';
  const toLowSurname = surname ? surname.toLowerCase() : '';
  const toLowNationality = nationality ? nationality.toLowerCase() : '';

  const filteredDB = await Driver.findAll({
    where: {
      forename: { [Op.iLike]: `%${toLowForname}%` },
      surname: { [Op.iLike]: `%${toLowSurname}%` },
      nationality: { [Op.iLike]: `%${toLowNationality}%` },
    },
  });

  const resp = await axios.get(`${apiUrl}`);
  const matchingObjects = resp.data.filter((obj) => {
    return (
      obj.forename?.toLowerCase() === forename?.toLowerCase() &&
      obj.surname?.toLowerCase() === surname?.toLowerCase() &&
      obj.nationality?.toLowerCase() === nationality?.toLowerCase() &&
      obj.dob === dob
    );
  });

  if (matchingObjects.length === 0 && filteredDB.length === 0) {
    const newDriver = await Driver.create({
      forename,
      surname,
      image,
      description,
      nationality,
      dob,
      teams: teams, // Asigna un equipo predeterminado si no se proporciona ninguno
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
