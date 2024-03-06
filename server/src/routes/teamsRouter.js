const {Router}=require("express")
const {getTeams}=require("../controllers/getTeams")
const teamsRouter=Router();

teamsRouter.get("/",async(req,res)=>{
    const teams= await getTeams();
    try {
        res.status(200).send(teams)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports=teamsRouter;