const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
 
const { getAllServicesController } = require('../controllers/servicesController');
const { getAllRoomsController } = require('../controllers/roomsController');
const { logController } = require('../controllers/logsController');
const { authController } = require('../controllers/authController');
const { accountController } = require('../controllers/accountController')
 
const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.use(logController);
 
router.get('/services', getAllServicesController);

router.get('/rooms', getAllRoomsController);

router.post('/auth', authController);

router.post('/create', accountController);

module.exports = router;