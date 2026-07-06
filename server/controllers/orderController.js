const orderModel = require('../models/orderModel');

const orderController = {
  create: async (req, res, next) => {
    try {
      const { totalAmount, address, phone, items } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Order error: Manifest item list is empty.' });
      }

      const orderId = await orderModel.create(req.user.id, {
        totalAmount,
        address,
        phone,
        items,
      });

      res.status(201).json({
        message: 'Order placed successfully.',
        id: orderId,
      });
    } catch (err) {
      next(err);
    }
  },

  getMyOrders: async (req, res, next) => {
    try {
      const orders = await orderModel.getByUserId(req.user.id);
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const { status } = req.body;
      await orderModel.updateStatus(req.params.id, status);
      res.status(200).json({ message: 'Order status updated successfully.' });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = orderController;
