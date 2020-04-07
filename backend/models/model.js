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

  getAllQuations: async () => {
    const data = await fs.readFile(path.resolve(__dirname, './database.json'));

    return JSON.parse(data).quations;
  },

  setNewUser: async (user) => {

    const data = await fs.readFile(path.resolve(__dirname, './database.json'));
    const jsonData = JSON.parse(data);
  
    jsonData.users.push({ id:jsonData.users.length, ...user });

    fs.writeFile(path.resolve(__dirname, './database.json'), JSON.stringify(jsonData));
  }
}