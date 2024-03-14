
const {Router} = require("express")
const postDrivers = require("../controllers/postDrivers")
const postRouter = Router()

postRouter.post("/", async (req,res)=>{
    const {forename, surname, description, image, nationality, dob, teams} = req.body;
    try {
        if(!forename || !surname || !description || !image || !nationality || !dob || !teams){
            throw Error("There are missing information to create the driver")
        }else {
            const newDriver = await postDrivers(
                forename,
                surname,
                description,
                image,
                nationality,
                dob,
                teams
            )
            return res.status(200).json(newDriver)
        }
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = postRouter;
