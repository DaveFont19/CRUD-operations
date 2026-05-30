const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const collectionName = 'customers';

const getAllCustomers = async (req, res, next) => {
  // #swagger.tags = ['Customers']
  try {
    const customers = await mongodb.getDatabase().collection(collectionName).find().toArray();
    res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
};

const getSingleCustomer = async (req, res, next) => {
  // #swagger.tags = ['Customers']
  try {
    const customer = await mongodb.getDatabase().collection(collectionName).findOne({ _id: new ObjectId(req.params.id) });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
};

const createCustomer = async (req, res, next) => {
  // #swagger.tags = ['Customers']
  try {
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      createdAt: new Date()
    };

    const response = await mongodb.getDatabase().collection(collectionName).insertOne(customer);
    res.status(201).json({ message: 'Customer created successfully', id: response.insertedId });
  } catch (err) {
    next(err);
  }
};

const updateCustomer = async (req, res, next) => {
  // #swagger.tags = ['Customers']
  try {
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      updatedAt: new Date()
    };

    const response = await mongodb.getDatabase().collection(collectionName).replaceOne(
      { _id: new ObjectId(req.params.id) },
      customer
    );

    if (response.matchedCount === 0) return res.status(404).json({ message: 'Customer not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const deleteCustomer = async (req, res, next) => {
  // #swagger.tags = ['Customers']
  try {
    const response = await mongodb.getDatabase().collection(collectionName).deleteOne({ _id: new ObjectId(req.params.id) });
    if (response.deletedCount === 0) return res.status(404).json({ message: 'Customer not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCustomers, getSingleCustomer, createCustomer, updateCustomer, deleteCustomer };
