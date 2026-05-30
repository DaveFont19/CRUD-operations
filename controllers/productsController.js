const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const collectionName = 'products';

const getAllProducts = async (req, res, next) => {
  // #swagger.tags = ['Products']
  try {
    const products = await mongodb.getDatabase().collection(collectionName).find().toArray();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getSingleProduct = async (req, res, next) => {
  // #swagger.tags = ['Products']
  try {
    const product = await mongodb.getDatabase().collection(collectionName).findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  // #swagger.tags = ['Products']
  try {
    const product = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      brand: req.body.brand,
      sku: req.body.sku,
      createdAt: new Date()
    };

    const response = await mongodb.getDatabase().collection(collectionName).insertOne(product);
    res.status(201).json({ message: 'Product created successfully', id: response.insertedId });
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  // #swagger.tags = ['Products']
  try {
    const product = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      brand: req.body.brand,
      sku: req.body.sku,
      updatedAt: new Date()
    };

    const response = await mongodb.getDatabase().collection(collectionName).replaceOne(
      { _id: new ObjectId(req.params.id) },
      product
    );

    if (response.matchedCount === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  // #swagger.tags = ['Products']
  try {
    const response = await mongodb.getDatabase().collection(collectionName).deleteOne({ _id: new ObjectId(req.params.id) });
    if (response.deletedCount === 0) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct };
