const {getDrivers}= require("./getDrivers");
const {getDbDriver}=require("./getDbDriver");

const getDriversByName=async(name)=>{
    const allDrivers= await getDrivers();
    const dBdrivers=await getDbDriver();
    return [...allDrivers, ...dBdrivers].filter((driver)=>
    driver.name.forename.toLowerCase().includes(name.forename.toLowerCase())
    )
}

module.exports={
    getDriversByName,
}
