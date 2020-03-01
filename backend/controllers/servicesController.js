const { getAllServices } = require('../models/model');

module.exports = {
    getAllServicesController: async (req, res) => {
        const services = await getAllServices();

        res.send(services);
    }
}
