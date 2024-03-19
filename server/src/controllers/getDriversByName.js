const {getDrivers}= require("./getDrivers");
const {getDbDriver}=require("./getDbDriver");

const getDriversByName=async(name)=>{
    const allDrivers= await getDrivers(); //obtengo todos los conductores
    const dBdrivers=await getDbDriver(); //obtengo conductores de la base de adtos
    const bothData = [...allDrivers, ...dBdrivers] //combino datos de conductores dela API y de la base de daots
    const filteredPilot = bothData.filter(pilot => pilot.forename.toLowerCase() === name.toLowerCase()); //filtro conductores por nombre
    return filteredPilot //devuelvo los conductores filtrados
}

module.exports={
    getDriversByName,
}