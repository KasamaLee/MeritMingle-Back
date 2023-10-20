const express = require('express')

const app = express();
const uploadMiddleware = require('../middlewares/upload')



const router = express.Router();

const paymentController = require('../controllers/payment-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

// router.post('/get', authenticateMiddleware, paymentController.getPayment);
router.post('/add', authenticateMiddleware, uploadMiddleware.single('slipImage'), paymentController.addPayment);

module.exports = router;