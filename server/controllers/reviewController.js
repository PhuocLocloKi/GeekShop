const reviewModel = require('../models/reviewModel');

const reviewController = {
  getByProductId: async (req, res, next) => {
    try {
      const reviews = await reviewModel.getByProductId(req.params.productId);
      res.status(200).json(reviews);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { productId, rating, comment } = req.body;
      const reviewId = await reviewModel.create(req.user.id, productId, rating, comment);
      res.status(201).json({ message: 'Review posted successfully.', id: reviewId });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = reviewController;
