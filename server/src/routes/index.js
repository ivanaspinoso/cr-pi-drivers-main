const { Router } = require("express");
const driversRouter = require("./driversRouter");
const driverByNameRouter = require("./driverByNameRouter");
const driversByIdRouter = require("./driversByIdRouter");
const teamsRouter = require("./teamsRouter");
const deleteRouter = require("./deleteRouter");
const postDriverRoute = require("./postRouter")

const router = Router();

router.use("/drivers", driversRouter);
router.use("/driversByname", driverByNameRouter);
router.use("/drivers", driversByIdRouter); // Cambiado a "/drivers/id/:id"
router.use("/drivers", deleteRouter);
router.use("/drivers", postDriverRoute)

router.use("/teams", teamsRouter);

// router.use()

module.exports = router;
