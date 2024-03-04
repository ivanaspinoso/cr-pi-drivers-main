const { Router } = require("express");
const getDrivers=require('./../controllers/getDrivers')
const getDriverById= require('./../controllers/getDriversById')
const getDriverByName= require('./../controllers/getDriverByName')
const getTeams=require('./../controllers/getTeams')
const postDriver= require('./../controllers/postDrivers')

const router = Router();

router.get('/drivers', getDrivers);
router.get('/drivers/search',getDriverByName);
router.get('/drivers/:idDriver',getDriverById);
router.get('/teams',getTeams);
router.post('/drivers',postDriver);

module.exports = router;
