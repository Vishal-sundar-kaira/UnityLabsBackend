const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');
const authMiddleware = require('../middleware/jwt');

// Get a list of all sellers
router.get('/list-of-sellers', authMiddleware.verifytoken, buyerController.getListOfSellers);

// Get the catalog of a specific seller
router.get('/seller-catalog/:seller_id', authMiddleware.verifytoken, buyerController.getSellerCatalog);

// Create an order for a specific seller
router.post('/create-order/:seller_id', authMiddleware.verifytoken, buyerController.createOrder);

//get products
router.get('/get-product', authMiddleware.verifytoken, buyerController.getProducts);
module.exports = router;
