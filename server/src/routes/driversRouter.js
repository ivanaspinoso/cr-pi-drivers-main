const { Router } = require("express");
const { getDrivers } = require("../controllers/getDrivers");

const driversRouter = Router();

driversRouter.get("/", async (req, res) => {
    const name = req.query.name;
    const allDrivers = await getDrivers();
    try {
        if (name) {
            const driverFound = await allDrivers.filter(driver => {
                if (typeof driver.name.forename === 'string') {
                    return driver.name.forename.toLowerCase().includes(name.toLowerCase());
                }
                return false;
            });
            return driverFound.length ? res.status(200).send(driverFound) : res.status(404).json({ msg: "Driver not found" });
        } else {
            return res.status(200).send(allDrivers);
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

module.exports = driversRouter;
