const { Router } = require("express");
const driverByNameRouter = Router();
const { getDriversByName } = require("../controllers/getDriversByName");

driverByNameRouter.get("/", async (req, res) => {
    const name = req.query.name; // Obtengo el parámetro de consulta 'name'
    try {

        const drivers = await getDriversByName(name); //obtengo los conductores por nombre
        if (drivers.length) {
            return res.status(200).json(drivers); //responde con los conductores encontrados
        } else {
            return res.status(404).json({ message: "There aren't drivers with that name" }); //si no se encuentran conductores larga un mensaje de error
        }
    } catch (error) {
        return res.status(500).json({ error: error.message }); // Responder con un mensaje de error en caso de error interno del servidor
    }
});

module.exports = driverByNameRouter;