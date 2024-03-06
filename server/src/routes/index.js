const { Router } = require("express");
const driversRouter = require("./driversRouter");
const driverByNameRouter = require("./driverByNameRouter");
const driversByIdRouter = require("./driversByIdRouter");
const teamsRouter = require("./teamsRouter");
const deleteRouter = require("./deleteRouter");

const router = Router();

router.use("/drivers", driversRouter);
router.use("/drivers/name", driverByNameRouter);
router.use("/drivers/id", driversByIdRouter); // Cambiado a "/drivers/id/:id"
router.use("/teams", teamsRouter);
router.use("/drivers", deleteRouter);

module.exports = router;
