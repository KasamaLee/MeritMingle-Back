const express = require('express');

const app = express();

const router = express.Router();


const productController = require('../controllers/product-controller')
const authenticateMiddleware = require('../middlewares/authenticate')
const uploadMiddleware = require('../middlewares/upload');
const authAdmin = require('../middlewares/authAdmin');


router.get('/get', productController.getProduct);
router.post('/add', authenticateMiddleware, authAdmin, uploadMiddleware.single('productImage'), productController.addProduct);
router.patch('/update/:id', authenticateMiddleware, authAdmin, uploadMiddleware.single('productImage'), productController.updateProduct);
router.delete('/delete/:id', authenticateMiddleware, authAdmin, productController.deleteProduct);


module.exports = router;