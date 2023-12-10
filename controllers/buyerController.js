// controllers/buyerController.js
const createError = require('../utils/createError');
const User = require('../models/Users');
const Catalog = require('../models/Catalogs');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getListOfSellers = async (req, res) => {
  try {
    const sellers = await User.find({ isSeller: true });
    res.status(200).json({ sellers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSellerCatalog = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const catalog = await Catalog.findOne({ seller: seller_id }).populate('products');
    if (!catalog) {
      return res.status(404).json({ error: 'Catalog not found for the specified seller' });
    }
    res.status(200).json({ catalog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const { items } = req.body;

    const seller = await User.findById(seller_id);
    if (!seller || !seller.isSeller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    const productIds = items.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    
    if (products.length !== items.length) {
      return res.status(404).json({ error: 'One or more products not found' });
    }

    const order = new Order({
      buyer: req.user.id,
      products: productIds,
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  