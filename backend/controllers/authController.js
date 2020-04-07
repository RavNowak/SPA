const { getAllUsers } = require('../models/model');

module.exports = {
  authController: async (req, res) => {
    const users = await getAllUsers();

    const { email, password } = req.body;

    for (const user of users) {
      if (user.email === email &&
        user.password === password) {
        return res.send({
          OK: true,
          name: user.name,
          surname: user.surname,
          email: user.email,
          tel: user.tel
        });
      }
    }

    res.send({ OK: false, message: "Invalid email or password" });
  }
}