const db = require('../config/db');

const favoriteModel = {
  getByUserId: async (userId) => {
    const [rows] = await db.query(
      `SELECT f.*, p.name, p.price, p.image_url, p.rating_avg, p.stock 
       FROM favorites f 
       LEFT JOIN products p ON f.product_id = p.id 
       WHERE f.user_id = ?`,
      [userId]
    );
    return rows;
  },

  toggle: async (userId, productId) => {
    // Check if favorite relation exists
    const [rows] = await db.query(
      'SELECT id FROM favorites WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (rows.length > 0) {
      // Exists -> remove
      await db.query('DELETE FROM favorites WHERE id = ?', [rows[0].id]);
      return { action: 'removed' };
    } else {
      // Doesn't exist -> add
      await db.query(
        'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)',
        [userId, productId]
      );
      return { action: 'added' };
    }
  },
};

module.exports = favoriteModel;
