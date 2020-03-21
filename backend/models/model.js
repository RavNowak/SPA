const fs = require('fs').promises;
const path = require('path');

module.exports = {
  getAllServices: async () => {
    const data = await fs.readFile(path.resolve(__dirname, './database.json'));

    return JSON.parse(data).treatments;
  },

  getAllRooms: async () => {
    const data = await fs.readFile(path.resolve(__dirname, './database.json'));

    return JSON.parse(data).rooms;
  },

  getAllUsers: async () => {
    const data = await fs.readFile(path.resolve(__dirname, './database.json'));

    return JSON.parse(data).users;
  },

  setNewUser: async (user) => {

    const data = await fs.readFile(path.resolve(__dirname, './database.json'));
    const jsonData = JSON.parse(data);
    const newID = jsonData.users[jsonData.users.length - 1].id + 1;

    jsonData.users.push(Object.assign({id: newID}, user));

    fs.writeFile(path.resolve(__dirname, './database.json'), JSON.stringify(jsonData));
  }
}