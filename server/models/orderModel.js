const db = require('../config/db');

const orderModel = {
  create: async (userId, { totalAmount, address, phone, items }) => {
    const conn = await db.getConnection();
    await conn.beginTransaction();

    try {
      // 1. Create order record
      const [orderResult] = await conn.query(
        'INSERT INTO orders (user_id, total_amount, address, phone) VALUES (?, ?, ?, ?)',
        [userId, totalAmount, address, phone]
      );
      const orderId = orderResult.insertId;

      // 2. Insert items into order details and subtract stock levels
      for (const item of items) {
        await conn.query(
          'INSERT INTO order_details (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
          [orderId, item.productId, item.quantity, item.price]
        );

        // Check stock availability first
        const [prodRows] = await conn.query('SELECT stock FROM products WHERE id = ? FOR UPDATE', [item.productId]);
        const currentStock = prodRows[0]?.stock || 0;

        if (currentStock < item.quantity) {
          throw new Error(`Insufficient inventory stock for item ID #${item.productId}`);
        }

        await conn.query(
          'UPDATE products SET stock = stock - ? WHERE id = ?',
          [item.quantity, item.productId]
        );
      }

      // Commit transaction
      await conn.commit();
      return orderId;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  getByUserId: async (userId) => {
    const [orders] = await db.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC',
      [userId]
    );

    // Populate sub-details for each order
    for (const order of orders) {
      const [details] = await db.query(
        `SELECT od.*, p.name 
         FROM order_details od 
         LEFT JOIN products p ON od.product_id = p.id 
         WHERE od.order_id = ?`,
        [order.id]
      );
      order.details = details;
    }

    return orders;
  },

  getAll: async () => {
    const [orders] = await db.query(
      `SELECT o.*, u.name as user_name 
       FROM orders o 
       LEFT JOIN users u ON o.user_id = u.id 
       ORDER BY o.id DESC`
    );
    return orders;
  },

  updateStatus: async (id, status) => {
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return true;
  },
};

module.exports = orderModel;
