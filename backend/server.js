const express = require('express');
const router = require('./routes/routes');
const config = require('./config');

const app = express();
  
app.use('/', router);
 
app.listen(config.port, () => console.log(`REST API is listening on port ${config.port}`));
 
