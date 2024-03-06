const {Route}= require("express")
const{getDrivers}=require("../controllers/getDrivers")

const router=Router();

router.get("/",async(req,res)=>{
    const name=req.query.name;
    const allDrivers=await getDrivers();
    try {
        if(name){
            const driverFound= await allDrivers
        }
    } catch (error) {
        
    }
})