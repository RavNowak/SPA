const { getAllUsers } = require('../models/model');

module.exports = {
  authController: async (req, res) => {
    let users = await getAllUsers();
    header = req.headers.authorization || '',
      token = header.split(/\s+/).pop() || '',
      auth = new Buffer.from(token, 'base64').toString(),
      parts = auth.split(/:/),
      email = parts[ 0 ],
      password = parts[ 1 ];

    for (const user of users) {
      if (user.email === email &&
        user.password === password)
        res.send({
          OK: true,
          name: user.name,
          surname: user.surname,
          email: user.email,
          tel: user.tel
        });
    }

    res.send({ OK: false });
  }
}