const fs = require('fs').promises;
const path = require('path');

module.exports = {
  getAllServices: async () => {
    const data = await fs.readFile(path.resolve(__dirname, './database.json'));

    return JSON.parse(data).treatments;
  }
}