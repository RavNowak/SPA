const express = require('express');
 
const { getAllServicesController } = require('../controllers/servicesController');
const { logController } = require('../controllers/logsController');
 
const router = express.Router();

router.use(logController);
 
router.get('/services', getAllServicesController);
 
module.exports = router;