const {getDrivers}= require("./getDrivers");
const {getDbDriver}=require("./getDbDriver");

const getDriversByName=async(name)=>{
    const allDrivers= await getDrivers();
    const dBdrivers=await getDbDriver();
    const bothData = [...allDrivers, ...dBdrivers]
    const filteredPilot = bothData.filter(pilot => pilot.forename.toLowerCase() === name.toLowerCase());
    return filteredPilot
}

module.exports={
    getDriversByName,
}