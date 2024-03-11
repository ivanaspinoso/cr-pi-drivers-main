// const {Driver,Team}=require('./../db');

// const postDrivers = async (req, res) => {
//     try {
//         const { name, lastname, description, image, nationality, dob, teams,createInDb } = req.body;

//         if (!teams?.length || !name || !lastname || !description || !image || !nationality || !dob) {
//             return res.status(400).json({ error: "Incomplete Driver Data" });
//         }

//         const teamIds = await Promise.all(teams.map(async (teamName) => {
//             const team = await Team.findOne({ where: { name: teamName } });
//             return team ? team.id : null; // Si no se encuentra el equipo, se devuelve null
//         }));

//         const [newDriver, created] = await Driver.findOrCreate({
//             where: {
//                 name,
//                 lastname,
//                 description,
//                 image,
//                 nationality,
//                 dob,
//             }
//         });

//         if (created) {
//             await newDriver.addTeams(teamIds.filter(id => id)); // Se agregan los equipos existentes (sin valores null)
//             return res.status(201).json({ message: 'Driver created successfully', newDriver });
//         } else {
//             return res.status(200).json({ message: 'Driver already existed', newDriver });
//         }
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

// module.exports = postDrivers;

const { Driver, Team } = require('./../db');
const { Op } = require('sequelize');

const postDrivers = async (req, res) => {
    try {
        const { name, lastname, description, image, nationality, dob, teams, createInDb } = req.body;

        if (!teams?.length || !name || !lastname || !description || !image || !nationality || !dob) {
            return res.status(400).json({ error: "Incomplete Driver Data" });
        }

        // Buscamos si ya existe un conductor con el mismo nombre en la base de datos usando
        // el operador Op.iLike para buscar sin importar mayúsculas o minúsculas
        const existingDriver = await Driver.findOne({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        });

        if (existingDriver) {
            return res.status(400).json({ error: "There is already a driver with that name" });
        }

        // Si no existe un conductor con ese nombre, creamos uno nuevo en la base de datos
        const newDriver = await Driver.create({
            name,
            lastname,
            description,
            image,
            nationality,
            dob,
            createInDb: true,
        });

        // Verificamos si la tabla de equipos está cargada usando count(), de no estar cargada, la creamos
        // invocando a getAllTeams (asumiendo que tienes una función similar a getAllTemps para equipos)
        const teamCount = await Team.count();
        if (teamCount === 0) {
            await getAllTeams(); // Asegúrate de tener esta función definida
        }

        const teamIds = await Promise.all(teams.map(async (teamName) => {
            const team = await Team.findOne({ where: { name: teamName } });
            return team ? team.id : null; // Si no se encuentra el equipo, se devuelve null
        }));

        // Añadimos los equipos mediante método add de SQL, gracias a la relación entre Driver y Team
        await newDriver.addTeams(teamIds.filter(id => id)); // Se agregan los equipos existentes (sin valores null)

        return res.status(201).json({ message: 'Driver created successfully', newDriver });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = postDrivers;
