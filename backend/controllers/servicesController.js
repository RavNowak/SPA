const { getAllServices } = require('../models/index');

module.exports = {
    getAllServicesController: async (req, res) => {
        const services = await getAllServices();

        res.send(services);
    }
}
