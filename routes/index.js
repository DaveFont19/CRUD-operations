const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello lets see products and customers',
  });
});

router.use('/products', require('./products'));
router.use('/customers', require('./customers'));

module.exports = router;
