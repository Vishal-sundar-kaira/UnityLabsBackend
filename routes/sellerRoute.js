const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/jwt');
const sellerController = require('../controllers/sellerController');

// Create a catalog for a seller
router.post('/create-catalog', authMiddleware.verifytoken, sellerController.createCatalog);

// Create a product for a seller
router.post('/create-product', authMiddleware.verifytoken, sellerController.createProduct);

// Get a list of orders received by a seller
router.get('/orders', authMiddleware.verifytoken, sellerController.getOrders);

module.exports = router;
