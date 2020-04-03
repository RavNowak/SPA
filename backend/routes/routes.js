const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const { getAllServicesController } = require('../controllers/servicesController');
const { getAllRoomsController } = require('../controllers/roomsController');
const { getAllQuationsController } = require('../controllers/quationsController');
const { logController } = require('../controllers/logsController');
const { authController } = require('../controllers/authController');
const { accountController } = require('../controllers/accountController');

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.use(logController);

router.get('/quations', getAllQuationsController);
 
router.get('/services', getAllServicesController);

router.get('/rooms', getAllRoomsController);

router.post('/auth', authController);

router.post('/create', accountController);

module.exports = router;