const axios = require("axios")

const getApiDriver = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/drivers`);
        return response.data.map(driver => ({
            id: driver.id,
            name: driver.name.forename,
            surname: driver.name.surname,
            image: driver.image.url,
            nationality: driver.nationality,
            dob: driver.birthdate,
            teams: driver.teams ? driver.teams.split(',').map(e => e.trim()) : [],
            description: driver.description,
        }));
    } catch (error) {
        throw new Error('Error fetching drivers from API: ' + error.message);
    }
};

module.exports={getApiDriver}

