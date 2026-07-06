const db = require('../config/db');

const cartModel = {
  getByUserId: async (userId) => {
    const [rows] = await db.query(
      `SELECT c.*, p.name, p.price, p.image_url, p.stock 
       FROM cart c 
       LEFT JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = ?`,
      [userId]
    );
    return rows;
  },

  addItem: async (userId, productId, quantity) => {
    const [rows] = await db.query(
      'SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (rows.length > 0) {
      // Item exists -> increase quantity
      const newQty = rows[0].quantity + quantity;
      await db.query(
        'UPDATE cart SET quantity = ? WHERE id = ?',
        [newQty, rows[0].id]
      );
      return rows[0].id;
    } else {
      // New item
      const [result] = await db.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity]
      );
      return result.insertId;
    }
  },

  updateQuantity: async (userId, productId, quantity) => {
    await db.query(
      'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
      [quantity, userId, productId]
    );
    return true;
  },

  removeItem: async (userId, productId) => {
    await db.query(
      'DELETE FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return true;
  },

  clear: async (userId) => {
    await db.query('DELETE FROM cart WHERE user_id = ?', [userId]);
    return true;
  },

  sync: async (userId, items) => {
    // Clear existing cart and sync with frontend state array
    await db.query('DELETE FROM cart WHERE user_id = ?', [userId]);
    for (const item of items) {
      await db.query(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, item.id, item.quantity]
      );
    }
    return true;
  },
};

module.exports = cartModel;
