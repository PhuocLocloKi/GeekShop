const db = require('../config/db');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');

const adminController = {
  getStats: async (req, res, next) => {
    try {
      const [revenueRows] = await db.query('SELECT COALESCE(SUM(total_amount), 0) as totalRevenue FROM orders WHERE status != "cancelled"');
      const [orderRows] = await db.query('SELECT COUNT(*) as totalOrders FROM orders');
      const [productRows] = await db.query('SELECT COUNT(*) as totalProducts FROM products');
      const [userRows] = await db.query('SELECT COUNT(*) as totalUsers FROM users');

      res.status(200).json({
        totalRevenue: revenueRows[0].totalRevenue,
        totalOrders: orderRows[0].totalOrders,
        totalProducts: productRows[0].totalProducts,
        totalUsers: userRows[0].totalUsers,
      });
    } catch (err) {
      next(err);
    }
  },

  getAllOrders: async (req, res, next) => {
    try {
      const orders = await orderModel.getAll();
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await userModel.getAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },

  updateUserRole: async (req, res, next) => {
    try {
      const { role } = req.body;
      if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role value.' });
      }
      await userModel.updateRole(req.params.id, role);
      res.status(200).json({ message: 'User role updated successfully.' });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = adminController;
