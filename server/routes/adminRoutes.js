const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.get('/stats', auth, adminOnly, adminController.getStats);
router.get('/orders', auth, adminOnly, adminController.getAllOrders);
router.get('/users', auth, adminOnly, adminController.getAllUsers);
router.put('/users/:id/role', auth, adminOnly, adminController.updateUserRole);

module.exports = router;
