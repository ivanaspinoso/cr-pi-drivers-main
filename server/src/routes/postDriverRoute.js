const {Router} = require("express")
const {postDrivers}=require("../controllers/postDrivers")
const postRouter=Router()

postRouter.post("/", async(req,res)=>{
    const { name,
        lastname,
        description,
        image,
        nationality,
        dob,
    createInDb }=req.body;

        try {
            if (!name || !lastname || !description || !image || !nationality || !dob){
            throw Error("There are missing information to create the driver")
            } else {
                const newDriver=await postDrivers(
                    name,
                    lastname,
                    description,
                    image,
                    nationality,
                    dob,
                    createInDb
                );
                return res.status(200).json(newDriver);
            }
        } catch (error) {
            return res.status(404).send(error.message)
        }


})

module.exports = postRouter;