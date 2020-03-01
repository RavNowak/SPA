const { getAllRooms } = require('../models/model');

module.exports = {
    getAllRoomsController: async (req, res) => {
        const rooms = await getAllRooms();

        res.send(rooms);
    }
}
