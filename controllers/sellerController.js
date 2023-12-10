const createError = require('../utils/createError');
const Catalog = require('../models/Catalogs');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createCatalog = async (req, res) => {
  try {
    // Check if the user is a seller
    if (!req.isSeller) {
      return res.status(403).json({ error: 'Access forbidden. Only sellers can create catalogs.' });
    }

    const { products } = req.body;

    // Create a new catalog for the seller
    const newCatalog = new Catalog({
      seller: req.userId, // Assuming that the user ID is stored in req.userId after token verification
      products: products.map(product => product._id), // Assuming products have their own unique IDs
    });

    await newCatalog.save();

    res.status(201).json({ message: 'Catalog created successfully', catalog: newCatalog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.createProduct = async (req, res) => {
    try {
      // Check if the user is a seller
      if (!req.isSeller) {
        return res.status(403).json({ error: 'Access forbidden. Only sellers can create products.' });
      }
  
      const { name, price } = req.body;
  
      // Create a new product for the seller
      const newProduct = new Product({
        name,
        price,
      });
  
      await newProduct.save();
  
      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
exports.getOrders = async (req, res) => {
  try {
    // Check if the user is a seller
    if (!req.isSeller) {
      return res.status(403).json({ error: 'Access forbidden. Only sellers can view orders.' });
    }

    // Get a list of orders received by the seller
    const orders = await Order.find({ 'products.seller': req.userId })
      .populate({
        path: 'products.product',
        select: 'name price',
      })
      .exec();

    res.status(200).json({ message: 'List of orders retrieved successfully', orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
