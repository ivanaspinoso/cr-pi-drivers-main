// Controlador para buscar conductores por nombre
const axios = require("axios");
const { Driver, Team, Sequelize } = require("../db");
const { Op } = require("sequelize");




const getDriversByNameApi = async (name) => {
    const response = await axios.get(`http://localhost:5000/drivers`);
    const { data } = response;

    // Normalizar el nombre proporcionado a minúsculas
    const lowerCaseName = name.toLowerCase();

    // Filtrar los conductores cuyo nombre coincida con el nombre proporcionado
    const filteredData = data.filter(driver => 
        driver.name.forename.toLowerCase().includes(lowerCaseName)
    );

    return filteredData;
}

const getDriversByNameDB = async (name) => {
    const data = await Driver.findAll({
        where: {
            [Op.or]: [
                Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('Drivers.name.forename')),
                    {
                        [Op.like]: `%${name.toLowerCase()}%`
                    }
                )
            ]
        },
        include: {
            model: Team,
            through: {
                attributes: []
            }
        }
    });

    const transformedData = data.map(driver => ({
        id : driver.id,
        name : {
            forename : driver.name,
            surname : driver.lastname
        },
        image : {
            url : driver.image 
        },
        birthdate : driver.birthdate,
        nationality : driver.nationality,
        teams : driver.Team.map(team => team.name).join(', '),
        description : driver.description
    }));

    return transformedData;
}

const getDriverByName = async (req, res) => {
    console.log('Entrando en el controlador getDriversByName');
    try {
        const { name } = req.query;

        // Obtener los conductores de la API y de la base de datos
        const driversAPI = await getDriversByNameApi(name);
        const driversDB = await getDriversByNameDB(name);

        // Combinar los resultados de la API y de la base de datos
        const drivers = [...driversAPI, ...driversDB];
        console.log('Enviando respuesta');

        return res.status(200).json(drivers);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

module.exports = getDriverByName;
