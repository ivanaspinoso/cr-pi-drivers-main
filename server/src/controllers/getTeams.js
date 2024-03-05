const { Team } = require("./../db");

const getTeams = async (req, res) => {
    console.log('Entrando en el controlador getTeams');
    try {
        const teams = await Team.findAll();
        return res.status(200).json(teams);
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
}

module.exports = getTeams;
