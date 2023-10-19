const express = require('express');

const app = express();

const router = express.Router();

const productController = require('../controllers/product-controller')


router.get('/get', productController.getProduct);
router.post('/add', productController.addProduct);
router.delete('/delete/:id', productController.deleteProduct);


module.exports = router;