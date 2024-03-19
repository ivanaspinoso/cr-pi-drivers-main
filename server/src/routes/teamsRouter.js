const { Router } = require("express");
const  getTeams  = require("../controllers/getTeams");
const teamsRouter = Router();

teamsRouter.get("/", async (req, res) => {
    try {
        const teams = await getTeams() //obtengo tdos los equipos
        res.status(200).json(teams); //responde con todos los equipos
    } catch (error) {

        res.status(404).json(error.message);
    }
});

module.exports = teamsRouter;
