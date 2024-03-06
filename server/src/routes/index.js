const { Router } = require("express");
const getDrivers = require('./../controllers/getDrivers');
const getDriverById = require('./../controllers/getDriversById');
const getDriverByName = require('./../controllers/getDriversByName'); // Cambia el nombre del controlador aquí
const getTeams = require('./../controllers/getTeams');
const postDriver = require('./../controllers/postDrivers');

const router = Router();

router.use("/drivers")
router.use("/teams")

module.exports = router;

