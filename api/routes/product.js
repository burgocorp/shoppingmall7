
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-Auth');
const productController = require('../controllers/product');




//product get
router.get('/', productController.product_get);

//product detail get
router.get('/:product_id', checkAuth, productController.product_get_detail);

//product post
router.post('/', checkAuth, productController.product_posting);

//product update
router.patch('/:product_id', checkAuth, productController.product_update);

//product delete
router.delete('/:product_id', checkAuth, productController.product_delete);



module.exports = router;