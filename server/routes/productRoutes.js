const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const upload = require('../config/multer');

// Public routes
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

// Admin routes
router.post('/', auth, adminOnly, upload.single('image'), productController.create);
router.put('/:id', auth, adminOnly, upload.single('image'), productController.update);
router.delete('/:id', auth, adminOnly, productController.delete);

module.exports = router;
