const { getAllQuations } = require('../models/model');

module.exports = {
    getAllQuationsController: async (req, res) => {
        const quations = await getAllQuations();

        res.send(quations);
    }
}