const categoryModel = require('../models/categoryModel');

const categoryController = {
  getAll: async (req, res, next) => {
    try {
      const categories = await categoryModel.getAll();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = categoryController;
