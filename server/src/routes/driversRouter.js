const { Router } = require("express");
const { getDrivers } = require("../controllers/getDrivers");

const driversRouter = Router();

driversRouter.get("/", async (req, res) => {
    const name = req.query.name; //obtengo el parametro de consulta 'name'
    try {
        const allDrivers = await getDrivers(); //obtengo todos los conductores
        if (name) {
            const driverFound = allDrivers.filter(driver => driver.name.forename.toLowerCase().includes(name.toLowerCase()));//filtro conductores por nombre
            return driverFound.length ? res.status(200).send(driverFound) : res.status(404).json({ msg: "Driver not found" }); // // Responder con los conductores encontrados o un mensaje de error si no se encuentran
        } else {
            return res.status(200).send(allDrivers); //responde con todos los conductores si nose proporciona el parametro d consulta
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

module.exports = driversRouter;