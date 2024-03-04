const axios = require("axios")
const {Driver, Team} =require('../db')
const {Op} = require("sequelize")
const API = "http://localhost:5000/drivers"

const getDrivers = async(req,res)=>{
    try {
        //se obtienen drivers desde local
        const localDrivers= await Driver.findAll({
            include:Team
        })

        const localDriversJSON=localDrivers.map(driver=>{
            return{
                ...driver.toJSON(),
                teams:driver.teams.map(team=>{
                    return team.name
                })
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