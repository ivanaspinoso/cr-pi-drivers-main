const {getApiDriver}=require("./getApiDriver");
const {getDbDriver}=require("./getDbDriver");

const getDrivers = async()=>{
    const apiDrivers=await getApiDriver();
    let dbDrivers= await getDbDriver();
    const allDrivers= apiDrivers.concat(dbDrivers);
    return allDrivers;
}

module.exports={
    getDrivers,
}