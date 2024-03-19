const {getApiDriver}=require("./getApiDriver");
const {getDbDriver}=require("./getDbDriver");

const getDrivers = async()=>{
    const apiDrivers=await getApiDriver();//obtengo conductores de la API
    let dbDrivers= await getDbDriver(); //obtengo conductores de la base de datos
    const allDrivers= apiDrivers.concat(dbDrivers); //combino conductores de la api con la base de datos
    return allDrivers; //devuelvo todos los conductores
}

module.exports={
    getDrivers,
}