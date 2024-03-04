const axios = require('axios');
const { Team } = require('./../db');

const createDB = async () => {
    try {
        // Realizar la solicitud a la API y manejar la respuesta
        const response = await axios.get('http://localhost:5000/drivers');
        const { data } = response;

        if (data.error) {
            throw new Error('Error al consultar la API');
        }

        // Procesar los datos de la API y agregarlos a la base de datos
        const teamsSet = new Set();
        data.forEach(driver => {
            if (driver.teams) {
                const teams = driver.teams.split(',').map(team => team.trim());
                teams.forEach(team => teamsSet.add(team));
            }
        });

        const uniqueTeamsArray = Array.from(teamsSet);
        await Promise.all(uniqueTeamsArray.map(async teamName => {
            // Verificar si el equipo ya existe en la base de datos
            const existingTeam = await Team.findOne({ where: { name: teamName } });
            if (!existingTeam) {
                // Si no existe, crear un nuevo equipo
                await Team.create({ name: teamName });
            }
        }));

        console.log('La base de datos se ha actualizado correctamente.');
    } catch (error) {
        console.error('Error al crear la base de datos:', error.message);
    }
}

module.exports = createDB;