const axios = require("axios");
const { Driver, Team, Sequelize } = require("../db");
const { Op } = require("sequelize");

const getDriversByNameApi = async (name) => {
    try {
        const response = await axios.get(`http://localhost:5000/drivers`);
        const { data } = response;
        console.log(data); // Verifica la estructura de los datos devueltos por la API
        const lowerCaseName = name.toLowerCase();
        const filteredData = data.filter(driver => 
            driver.name.forename.toLowerCase().includes(lowerCaseName)
        );
        return filteredData;
    } catch (error) {
        throw new Error('Error al obtener conductores desde la API: ' + error.message);
    }
}

const getDriversByNameDB = async (name) => {
    try {
        const data = await Driver.findAll({
            where: {
                [Op.or]: [
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('name.forename')),
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
            id: driver.id,
            name: {
                forename: driver.name,
                surname: driver.lastname
            },
            image: {
                url: driver.image 
            },
            birthdate: driver.birthdate,
            nationality: driver.nationality,
            teams: driver.Team.map(team => team.name).join(', '),
            description: driver.description
        }));

        return transformedData;
    } catch (error) {
        throw new Error('Error al obtener conductores desde la base de datos: ' + error.message);
    }
}

const getDriverByName = async (req, res) => {
    console.log('Entrando en el controlador getDriversByName');
    try {
        const { name } = req.query;
        console.log(name);
        const driversAPI = await getDriversByNameApi(name);
        const driversDB = await getDriversByNameDB(name);
        const drivers = [...driversAPI, ...driversDB];
        console.log('Enviando respuesta');
        return res.status(200).json(drivers);
    } catch (error) {
        console.error('Error en el controlador getDriverByName:', error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getDriverByName;
