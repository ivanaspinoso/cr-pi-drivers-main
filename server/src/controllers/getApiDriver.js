const axios = require("axios")

const getApiDriver = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/drivers`); //realiza una solicitud get a la API

        //mapea los datos de los conductores obtenidos de la API y los transforma segun el formato requerido
        return response.data.map(driver => ({
            id: driver.id,
            forename: driver.name.forename,
            surname: driver.name.surname,
            image: driver.image,
            nationality: driver.nationality,
            dob: driver.dob,
            origin: 'api',
            teams: driver.teams ? driver.teams.split(',').map(e => e.trim()) : [],
            description: driver.description,
        }));
    } catch (error) {
        throw new Error('Error fetching drivers from API: ' + error.message);
    }
};

module.exports={getApiDriver}