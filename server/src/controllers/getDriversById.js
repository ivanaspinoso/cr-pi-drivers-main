const axios = require('axios');
const { Driver , Team } = require('./../db');

const getDriverById = async (req,res) => {

    try {
        
        const { idDriver } = req.params;
        let data;

        try {
            const response = await axios.get(`http://localhost:5000/drivers/${idDriver}`);

            data = response.data;
        } catch (error) {
            console.log(error.message);
        }

        if (data) {
            return res.status(200).json(data); // si se obtiene datos de la API, devolver com respuesta
        }

        //busco al conductor en la base de datos por su id
        const driver = await Driver.findOne({
            where : {
                id : idDriver
            },
            include : {
                model : Team,
                through : {
                    attributes : []
                }
            } 
        });

        if (driver) {
        //transforma los datos del conductor segun el formato requerido
            const transformedDriver = {
                id : driver.id,
                name : {
                    forename : driver.name,
                    surname : driver.lastname
                },
                image : {
                    url : driver.image 
                },
                dob : driver.dob,
                nationality : driver.nationality,
                teams : driver.Team.map(team => team.name).join(', '),
                description : driver.description
            };

            return res.status(200).json(transformedDriver); //devuelve al conductor
        }

        return res.status(404).json({error:'Driver not found'});


    } catch (error) {
        return res.status(500).json({error:error.message});
    }

}

module.exports = getDriverById;