const axios = require("axios")
const {Driver, Team} =require('../db')
const {Op} = require("sequelize")
const API = "http://localhost:5000/drivers"
const DEFAULT_IMAGE_URL = "https://t3.ftcdn.net/jpg/05/70/71/46/360_F_570714673_cclOhgn229q81CQjO1C53jIFzRbMtI86.jpg"

const getDrivers = async(req,res)=>{
    try {
        //se obtienen drivers desde local
        const localDrivers= await Driver.findAll({
            include:Team
        })

        const localDriversJSON=localDrivers.map(driver=>{
            return{
                ...driver.toJSON(),
                teams: driver.teams.map(team => team.name),
                // Verificar si el conductor tiene una imagen. Si no la tiene, asignar la imagen por defecto
                image: driver.image ? driver.image : DEFAULT_IMAGE_URL
            }
        })

        //se obtienen drivers desde la API
        const {data}=await axios.get(API);
        const driversFromApi = data.map(driver=>({
            id: driver.id,
            name:driver.name.forename,
            lastname:driver.name.surname,
            description:driver.description,
            image: driver.image.url,
            nationality: driver.nationality,
            dateofbirdth:driver.birthdate,
            teams: driver.teams ? driver.teams.split(',').map(e => e.trim()) : []
        }))
        const driversGotten = [...driversFromApi,...localDriversJSON]
        return res.status(200).json(driversGotten)
    } catch (error) {
        return res.status(500).send(error.message)
    }

};

module.exports=getDrivers;