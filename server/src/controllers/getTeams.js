const axios = require("axios");
const { Team } = require('../db');
const API = 'http://localhost:5000/drivers';

const getTeams = async () => {
    try {
        //* Se obtienen teams de local
        const localTeams = await Team.findAll(); //obtengo equipos de la base de datos local

        if (localTeams.length > 0) { //verificar si hay equipos en la base de datos local
            return localTeams; //devolver los equipos obtenidos de la base de datos local
        } else { //si no hay equipos
            const { data } = await axios.get(API); //realizar una solicitud GET a la API externa y obtener la respuesta
            const teamsFromAPI = data.flatMap((driver) => {
                if (driver.teams) {
                    return driver.teams.split(", ").map(team => team.trim());
                }
                return []
            });
            const teamsGotten = [...new Set(teamsFromAPI)].sort();//convertir los nombres de equipos en un conjunto para eliminar duplicados y ordenarlos alfabeticamente

            // crear los equipos en la base de datos a partir de los nombres obtenidos de la API
            const teamsToDB = await Team.bulkCreate(
                teamsGotten.map(team => ({ name: team }))//mapea los nombres de equipos a obtejos y crearlos en la base de daots
            );

            return teamsToDB; //devolver los equipos creados en la base de datos
        }      
        
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = getTeams;