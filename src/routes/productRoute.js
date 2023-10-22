const express = require('express');

const app = express();

const router = express.Router();


const productController = require('../controllers/product-controller')
const authenticateMiddleware = require('../middlewares/authenticate')
const uploadMiddleware = require('../middlewares/upload')


router.get('/get', authenticateMiddleware, productController.getProduct);
router.post('/add', authenticateMiddleware, uploadMiddleware.single('productImage'), productController.addProduct);
router.patch('/update/:id', authenticateMiddleware, uploadMiddleware.single('productImage'), productController.updateProduct);
router.delete('/delete/:id', authenticateMiddleware, productController.deleteProduct);


module.exports = router;