const {Team} =require("./../db")

const getTeams=async(req,res)=>{
    console.log('entro')
    try {
        const teams = await Team.findAll();
        return res.status(200).json(teams);
    } catch (error) {
        return res.status(500).json({error:err.message})
    }
}

module.exports=getTeams