const { Driver, Team } = require('./../db');

const postDrivers = async (req, res) => {
    try {
        const { forename, surname, description, image, nationality, dob, teams } = req.body;

        if (!teams?.length || !forename || !surname || !description || !image || !nationality || !dob) {
            return res.status(400).json({ error: 'Incomplete Driver Data', missingFields: ['teams', 'forename', 'surname', 'description', 'image', 'nationality', 'dob'].filter(field => !req.body[field]) });
        }
        

        const teamIds = await Promise.all(teams.map(async (teamName) => {
            const team = await Team.findOne({ where: { forename: teamName } });
            return team.id;
        }));

        const [newDriver, created] = await Driver.findOrCreate({
            where: {
                forename,
                surname,
                description,
                image,
                nationality,
                dob
            }
        });

        await newDriver.setTeams(teamIds);

        // Solo envía una respuesta aquí
        return res.status(200).json(newDriver);

    } catch (err) {
        // Solo envía una respuesta aquí
        return res.status(500).json({ error: err.message });
    }
}

module.exports = postDrivers;