// routes/drivers/postDriver.js

const {Router} = require("express")
const postDrivers = require("../controllers/postDrivers")
const postRouter = Router()

postRouter.post("/", postDrivers); // Simplemente pasa el controlador como manejador de la ruta

module.exports = postRouter;
