const express = require('express')

const app = express();

const router = express.Router();

const orderController = require('../controllers/order-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

// router.post('/add', authenticateMiddleware ,cartController.addToCart);
router.get('/get', authenticateMiddleware, orderController.getOrder);


module.exports = router;