const { Router } = require("express");
const  getTeams  = require("../controllers/getTeams");
const teamsRouter = Router();

teamsRouter.get("/", async (req, res) => {
    console.log('entro')
    try {
        const teams = await getTeams()
        console.log(teams)
        res.status(200).send(teams);
    } catch (error) {
        console.log('hola', error)

        res.status(404).send(error.message);
    }
});

module.exports = teamsRouter;
