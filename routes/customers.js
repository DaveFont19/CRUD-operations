const express = require('express');
const { body, param } = require('express-validator');
const customersController = require('../controllers/customersController');
const validate = require('../middleware/validate');
const authValidation = require("../middleware/authentication");

const router = express.Router();

const customerValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('city').trim().notEmpty().withMessage('City is required')
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid customer ID')
];

router.get('/', customersController.getAllCustomers);
router.get('/:id', idValidation, validate, customersController.getSingleCustomer);
router.post('/', authValidation, customerValidation, validate, customersController.createCustomer);
router.put('/:id', authValidation, idValidation, customerValidation, validate, customersController.updateCustomer);
router.delete('/:id', authValidation, idValidation, validate, customersController.deleteCustomer);

module.exports = router;
