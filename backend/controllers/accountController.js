const { setNewUser, getAllUsers } = require('../models/model');

module.exports = {
  accountController: async (req, res) => {
    const newUser = req.body.user;
    const users = await getAllUsers();

    for (let user of users) {
      if (user.email === newUser.email) {
        res.send({ OK: false, message: `${user.email} already exists` });

        return;
      }
    }

    await setNewUser(req.body.user);

    res.send({ OK: true });
  }
}