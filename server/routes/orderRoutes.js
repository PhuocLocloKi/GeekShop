const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// User routes
router.post('/', auth, orderController.create);
router.get('/', auth, orderController.getMyOrders);

// Admin route for status update
router.put('/:id/status', auth, adminOnly, orderController.updateStatus);

module.exports = router;
