const { setNewUser } = require('../models/model');

module.exports = {
  accountController: async (req, res) => {
    console.log(req.body.user);
    let result = await setNewUser(req.body.user);


    res.send({ OK: true });
  }
}