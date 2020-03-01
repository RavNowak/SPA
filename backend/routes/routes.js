const express = require('express');
const cors = require('cors');
 
const { getAllServicesController } = require('../controllers/servicesController');
const { getAllRoomsController } = require('../controllers/roomsController');
const { logController } = require('../controllers/logsController');
 
const router = express.Router();

router.use(cors());

router.use(logController);
 
router.get('/services', getAllServicesController);

router.get('/rooms', getAllRoomsController);

module.exports = router;