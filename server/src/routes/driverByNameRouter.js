const { Router } = require("express");
const driverByNameRouter = Router();
const getDriverByName = require("../controllers/getDriversByName");

driverByNameRouter.get("/name", async (req, res) => {
    const name = req.query.name.toLowerCase();
    try {
        const drivers = await getDriverByName(name);
        if (drivers.length) {
            return res.status(200).json(drivers);
        } else {
            return res.status(404).json({ message: "There aren't drivers with that name" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = driverByNameRouter;
