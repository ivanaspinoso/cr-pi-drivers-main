const { Router } = require("express");
const getDrivers = require('./../controllers/getDrivers');
const getDriverById = require('./../controllers/getDriversById');
const getDriversByName = require('./../controllers/getDriverByName'); // Cambia el nombre del controlador aquí
const getTeams = require('./../controllers/getTeams');
const postDriver = require('./../controllers/postDrivers');

const router = Router();

router.get('/drivers', getDrivers);
router.get('/drivers/name',getDriversByName); 
router.get('/drivers/:idDriver', getDriverById);
router.get('/teams', getTeams);
router.post('/drivers', postDriver);

module.exports = router;

