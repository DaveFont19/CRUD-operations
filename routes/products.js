const express = require('express');
const { body, param } = require('express-validator');
const productsController = require('../controllers/productsController');
const validate = require('../middleware/validate');

const router = express.Router();

const productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('sku').trim().notEmpty().withMessage('SKU is required')
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid product ID')
];

router.get('/', productsController.getAllProducts);
router.get('/:id', idValidation, validate, productsController.getSingleProduct);
router.post('/', productValidation, validate, productsController.createProduct);
router.put('/:id', idValidation, productValidation, validate, productsController.updateProduct);
router.delete('/:id', idValidation, validate, productsController.deleteProduct);

module.exports = router;
