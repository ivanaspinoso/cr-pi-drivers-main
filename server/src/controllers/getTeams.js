const axios = require('axios');
const { Team } = require('../db');

const API_URL = 'http://localhost:5000/drivers';

const getTeams = async () => {
    try {
        // Obtener datos de la API
        const { data } = await axios.get(API_URL);

        if (!data || data.length === 0) {
            // Si no hay datos en la API, retornar los equipos de la base de datos
            const teamsFromDB = await Team.findAll();
            return teamsFromDB;
        }

        // Extraer los nombres de los equipos de los datos de la API y eliminar duplicados
        const uniqueTeams = [...new Set(data.flatMap(driver => driver.teams ? driver.teams.split(',').map(team => team.trim()) : []))];

        // Verificar si los equipos ya están en la base de datos
        const existingTeams = await Team.findAll({ where: { nombre: uniqueTeams } });

        // Si no hay equipos en la base de datos, guardar los equipos obtenidos de la API
        if (existingTeams.length === 0) {
            await Promise.all(uniqueTeams.map(team => Team.findOrCreate({ where: { nombre: team } })));
        }

        // Obtener los equipos de la base de datos después de guardar los nuevos
        const teamsAfterSave = await Team.findAll();
        return teamsAfterSave;
    } catch (error) {
        // Manejar errores
        console.error('Error al obtener equipos:', error);
        throw new Error('Error al obtener equipos desde la API');
    }
};

module.exports = getTeams;
