const {Driver, Team}= require("../db")

// const DEFAULT_IMAGE_URL = "https://t3.ftcdn.net/jpg/05/70/71/46/360_F_570714673_cclOhgn229q81CQjO1C53jIFzRbMtI86.jpg";

const getDbDriver=async()=>{
    const dbDriver= await Driver.findAll({
        include:Team
    });

    const reDriver= dbDriver?.map((driver)=>{
        return{
            id: driver.id,
            name: driver.name.forename,
            surname: driver.name.surname,
            image: driver.image.url, 
            nationality: driver.nationality,
            dob: driver.birthdate,
            teams: driver.teams ? driver.teams.split(',').map(e => e.trim()) : [],
            description: driver.description,
        }
    })
    return reDriver;
}

module.exports={
    getDbDriver,
}