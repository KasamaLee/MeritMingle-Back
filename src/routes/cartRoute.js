const express = require('express')

const app = express();

const router = express.Router();

const cartController = require('../controllers/cart-controller')

router.post('/', cartController.addToCart);

module.exports = router;