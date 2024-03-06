const axios = require('axios');
const { Team } = require('../db');

const getTeamsFromAPI = async () => {
    try {
        const response = await axios.get('http://localhost:5000/drivers');
        const teamsData = response.data.flatMap(driver => driver.teams ? driver.teams.split(',').map(team => team.trim()) : []);
        return [...new Set(teamsData)];
    } catch (error) {
        throw new Error('Error fetching teams from API: ' + error.message);
    }
};

const saveTeamsToDB = async (teams) => {
    try {
        await Team.bulkCreate(teams.map(team => ({ name: team })));
    } catch (error) {
        throw new Error('Error saving teams to database: ' + error.message);
    }
};

const getTeams = async () => {
    try {
        let teams = await Team.findAll();
        if (teams.length === 0) {
            teams = await getTeamsFromAPI();
            await saveTeamsToDB(teams);
        }
        return teams;
    } catch (error) {
        throw new Error('Error getting teams: ' + error.message);
    }
};
module.exports = getTeams;
