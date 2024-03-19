const { Router } = require("express");
const { getDrivers } = require("../controllers/getDrivers");
const driversByIdRouter = Router();

driversByIdRouter.get("/:id", async (req, res) => {
    const id = req.params.id; //obtengo el parametro de ruta id 
    try {
        const allDrivers = await getDrivers(); //obtengo todos los conductores
        const driver = allDrivers.find(driver => driver.id === parseInt(id)); //busca conductores por id
        if (driver) {
            res.status(200).json(driver); //responde con el conductor encontrado
        } else {
            res.status(404).json("Driver not found"); //mensaje de error si no encuentra al conductor
        }
    } catch (error) {
        res.status(500).json(error.message); // Cambiado a 500 para errores del servidor
    }
});

module.exports = driversByIdRouter;