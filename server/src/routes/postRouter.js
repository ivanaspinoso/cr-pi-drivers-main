
const {Router} = require("express")
const postRouter = Router()
const postDrivers = require("../controllers/postDrivers")

postRouter.post("/", async (req,res)=>{
    const {forename, surname, description, image, nationality, dob, teams} = req.body;
    try {
        const created = await postDrivers(
          forename,
          surname,
          image,
          description,
          nationality,
          dob,
          teams
        ); //crea un nuevo conductor
        res.status(201).json(created); //responde con el conductor creado
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
});

module.exports = postRouter;
