const db = require('../config/db');

const categoryModel = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY id ASC');
    return rows;
  },

  findByName: async (name) => {
    const [rows] = await db.query('SELECT * FROM categories WHERE name = ?', [name]);
    return rows[0];
  },
};

module.exports = categoryModel;
