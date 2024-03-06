const { Router } = require("express");
const driverByNameRouter = Router();
const { getDriversByName } = require("../controllers/getDriversByName");

driverByNameRouter.get("/", async (req, res) => {
    const name = req.query.name;
    console.log(name)
    try {

        const drivers = await getDriversByName(name);
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
