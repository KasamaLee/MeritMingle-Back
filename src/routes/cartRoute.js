const express = require('express')

const app = express();

const router = express.Router();

const cartController = require('../controllers/cart-controller')
const authenticateMiddleware = require('../middlewares/authenticate');
const authUser = require('../middlewares/authUser');

router.post('/add', authenticateMiddleware, authUser, cartController.addToCart);
router.get('/get', authenticateMiddleware, authUser, cartController.getCart);
router.delete('/delete/:id', authenticateMiddleware, authUser, cartController.deleteCart);
router.patch('/update/:id', authenticateMiddleware, authUser, cartController.updateCart);
router.get('/get/:id', authenticateMiddleware, authUser, cartController.getCartById);

module.exports = router;