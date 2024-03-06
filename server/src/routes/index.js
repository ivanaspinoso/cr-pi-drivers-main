const getDriverByNameRoute = require("./driverByNameRouter");
const getDriverById = require("./driversByIdRouter");
const getTeamsRoute = require("./teamsRouter");
const getDriverRoute=require("./driversRouter")
const { Router } = require("express");

const router = Router();

router.use("/drivers", getDriverRoute);
router.use("/drivers/name", getDriverByNameRoute);
router.use("/drivers/:id", getDriverById);
router.use("/teams", getTeamsRoute);

module.exports = router;
