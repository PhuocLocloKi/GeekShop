const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.get('/', auth, cartController.getCart);
router.post('/', auth, cartController.addItem);
router.post('/sync', auth, cartController.syncCart);
router.put('/:id', auth, cartController.updateItem);
router.delete('/:id', auth, cartController.removeItem);

module.exports = router;
