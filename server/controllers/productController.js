const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');

const productController = {
  getAll: async (req, res, next) => {
    try {
      const { category, minPrice, maxPrice, search, sort } = req.query;
      const products = await productModel.getAll({
        category,
        minPrice,
        maxPrice,
        search,
        sort,
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const product = await productModel.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { name, description, price, category, stock, specs } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : '/images/products/placeholder.png';

      // Find category ID
      const cat = await categoryModel.findByName(category);
      const categoryId = cat ? cat.id : 1; // default to first category

      const productId = await productModel.create({
        name,
        description,
        price: Number(price),
        imageUrl,
        categoryId,
        stock: Number(stock),
        specs: typeof specs === 'string' ? JSON.parse(specs) : specs,
      });

      res.status(201).json({
        message: 'Product created successfully.',
        id: productId,
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { name, description, price, category, stock, specs } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const cat = await categoryModel.findByName(category);
      const categoryId = cat ? cat.id : 1;

      await productModel.update(req.params.id, {
        name,
        description,
        price: Number(price),
        imageUrl,
        categoryId,
        stock: Number(stock),
        specs: typeof specs === 'string' ? JSON.parse(specs) : specs,
      });

      res.status(200).json({ message: 'Product updated successfully.' });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      await productModel.delete(req.params.id);
      res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productController;
