const {Driver,Team}=require('./../db');

const postDrivers = async (req, res) => {
    try {
        const { name, lastname, description, image, nationality, dob, teams,createInDb } = req.body;

        if (!teams?.length || !name || !lastname || !description || !image || !nationality || !dob) {
            return res.status(400).json({ error: "Incomplete Driver Data" });
        }

        const teamIds = await Promise.all(teams.map(async (teamName) => {
            const team = await Team.findOne({ where: { name: teamName } });
            return team ? team.id : null; // Si no se encuentra el equipo, se devuelve null
        }));

        const [newDriver, created] = await Driver.findOrCreate({
            where: {
                name,
                lastname,
                description,
                image,
                nationality,
                dob
            }
        });

        if (created) {
            await newDriver.addTeams(teamIds.filter(id => id)); // Se agregan los equipos existentes (sin valores null)
            return res.status(201).json({ message: 'Driver created successfully', newDriver });
        } else {
            return res.status(200).json({ message: 'Driver already existed', newDriver });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = postDrivers;
