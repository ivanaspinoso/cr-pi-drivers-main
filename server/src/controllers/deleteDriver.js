const axios = require('axios');
const { Driver } = require('../db');

const deleteDriver = async (id) => {
    if (!id) {
        throw new Error("Driver ID is required");
    }
    try {
        if (typeof id !== "string") {
            throw new Error("Cannot delete this driver");
        }

        const foundDriver = await Driver.findByPk(id);
        if (!foundDriver) {
            throw new Error("Driver not found");
        }

        await foundDriver.destroy();
        return foundDriver;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports={deleteDriver,}