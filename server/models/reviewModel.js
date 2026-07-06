const db = require('../config/db');
const productModel = require('./productModel');

const reviewModel = {
  getByProductId: async (productId) => {
    const [rows] = await db.query(
      `SELECT r.*, u.name as user_name 
       FROM reviews r 
       LEFT JOIN users u ON r.user_id = u.id 
       WHERE r.product_id = ? 
       ORDER BY r.id DESC`,
      [productId]
    );
    return rows;
  },

  create: async (userId, productId, rating, comment) => {
    const [result] = await db.query(
      'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
      [userId, productId, rating, comment]
    );

    // Trigger average rating recalculation
    await productModel.updateRating(productId);

    return result.insertId;
  },

  delete: async (id) => {
    // Get product ID first to recalculate rating later
    const [rows] = await db.query('SELECT product_id FROM reviews WHERE id = ?', [id]);
    const productId = rows[0]?.product_id;

    await db.query('DELETE FROM reviews WHERE id = ?', [id]);

    if (productId) {
      await productModel.updateRating(productId);
    }
    return true;
  },
};

module.exports = reviewModel;
