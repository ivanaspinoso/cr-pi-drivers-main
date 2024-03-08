const {getDrivers}= require("./getDrivers");
const {getDbDriver}=require("./getDbDriver");

const getDriversByName=async(name)=>{
    const allDrivers= await getDrivers();
    const dBdrivers=await getDbDriver();
    const bothData = [...allDrivers, ...dBdrivers].slice(0,10)
    const filteredPilot = bothData.filter(pilot => pilot.name === name); 
    return filteredPilot
}

module.exports={
    getDriversByName,
}
