const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

router.get('/:productId', reviewController.getByProductId);
router.post('/', auth, reviewController.create);

module.exports = router;
