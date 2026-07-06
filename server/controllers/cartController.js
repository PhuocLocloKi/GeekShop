const cartModel = require('../models/cartModel');

const cartController = {
  getCart: async (req, res, next) => {
    try {
      const cart = await cartModel.getByUserId(req.user.id);
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  },

  addItem: async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
      const id = await cartModel.addItem(req.user.id, productId, Number(quantity || 1));
      res.status(200).json({ message: 'Cart synced successfully.', id });
    } catch (err) {
      next(err);
    }
  },

  updateItem: async (req, res, next) => {
    try {
      const { quantity } = req.body;
      const { id } = req.params; // product_id
      await cartModel.updateQuantity(req.user.id, id, Number(quantity));
      res.status(200).json({ message: 'Cart item quantity updated.' });
    } catch (err) {
      next(err);
    }
  },

  removeItem: async (req, res, next) => {
    try {
      const { id } = req.params; // product_id
      await cartModel.removeItem(req.user.id, id);
      res.status(200).json({ message: 'Item removed from cart.' });
    } catch (err) {
      next(err);
    }
  },

  syncCart: async (req, res, next) => {
    try {
      const { items } = req.body;
      await cartModel.sync(req.user.id, items || []);
      res.status(200).json({ message: 'Cart local buffer synchronized with server database.' });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = cartController;
