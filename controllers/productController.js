const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    
    // Create a new product
    const newProduct = new Product({ name, price });
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    // Retrieve all products
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
