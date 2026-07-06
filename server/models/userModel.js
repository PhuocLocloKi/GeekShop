const db = require('../config/db');

const userModel = {
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT id, name, email, avatar_url, role, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  create: async ({ name, email, password, role = 'user' }) => {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );
    return result.insertId;
  },

  updateProfile: async (id, { name, avatarUrl }) => {
    await db.query(
      'UPDATE users SET name = ?, avatar_url = ? WHERE id = ?',
      [name, avatarUrl, id]
    );
    return true;
  },

  updatePassword: async (id, hashedPassword) => {
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);
    return true;
  },

  getAll: async () => {
    const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users ORDER BY id DESC');
    return rows;
  },

  updateRole: async (id, role) => {
    await db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    return true;
  },
};

module.exports = userModel;
