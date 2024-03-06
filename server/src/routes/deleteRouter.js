const { Router } = require("express");
const deleteRouter = Router();
const { deleteDriver } = require("../controllers/deleteDriver");

deleteRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const driver = await deleteDriver(id);
        return res.status(200).json(`The driver ${driver.name} was deleted`);
    } catch (error) {
        return res.status(404).send(error.message);
    }
});

module.exports = deleteRouter;
