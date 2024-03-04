const axios = require("axios")
const {Driver,Team}= require("./../db")
const {Op, Sequelize}= require("sequelize")

const getDriversByNameApi = async (name) => {
    const response = await axios.get(`http://localhost:5000/drivers`);

    const { data } = response;

    const filteredData = data.filter(driver => 
        driver.name.forename.toLowerCase().includes(name.toLowerCase())
    );

    return filteredData;
}

const getDriversByNameDB = async (name) => {
    const data = await Driver.findAll({
        where: Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('Drivers.name')),
            {
                [Op.iLike]: `%${name.toLowerCase()}%`
            }
        ),
        include : {
            model : Team,
            through : {
                attributes : []
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

const getDriversByName = async (req, res) => {

    try {

        const {name} = req.query;

        const driversAPI = await getDriversByNameApi(name);
        const driversDB = await getDriversByNameDB(name);
        const drivers = [...driversAPI, ...driversDB];

        return res.status(200).json(drivers);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports=getDriversByName;