const favoriteModel = require('../models/favoriteModel');

const favoriteController = {
  getFavorites: async (req, res, next) => {
    try {
      const favorites = await favoriteModel.getByUserId(req.user.id);
      res.status(200).json(favorites);
    } catch (err) {
      next(err);
    }
  },

  toggleFavorite: async (req, res, next) => {
    try {
      const result = await favoriteModel.toggle(req.user.id, req.params.productId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = favoriteController;
