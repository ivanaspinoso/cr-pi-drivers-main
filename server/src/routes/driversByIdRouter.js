const { Router } = require("express");
const { getDrivers } = require("../controllers/getDrivers");
const driversByIdRouter = Router();

driversByIdRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const allDrivers = await getDrivers();
        const driver = allDrivers.find(driver => driver.id === parseInt(id));
        if (driver) {
            res.status(200).send(driver);
        } else {
            res.status(404).json("Driver not found");
        }
    } catch (error) {
        res.status(500).send(error.message); // Cambiado a 500 para errores del servidor
    }
});

module.exports = driversByIdRouter;