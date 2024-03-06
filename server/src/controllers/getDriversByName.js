const {getDrivers}= require("./getDrivers");
const {getDbDriver}=require("./getDbDriver");

const getDriversByName=async(name)=>{
    const allDrivers= await getDrivers();
    const dBdrivers=await getDbDriver();
    return [...allDrivers, ...dBdrivers].filter((driver)=>
    driver.name.toLowerCase().includes(name.toLowerCase())
    )
}

module.exports={
    getDriversByName,
}
