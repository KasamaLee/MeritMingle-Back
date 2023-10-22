const express = require('express')

const app = express();

const router = express.Router();


const orderController = require('../controllers/order-controller')
const authenticateMiddleware = require('../middlewares/authenticate')
const uploadMiddleware = require('../middlewares/upload')


router.post('/add', authenticateMiddleware, uploadMiddleware.single('slipImage'), orderController.addOrder);

router.get('/get', authenticateMiddleware, orderController.getOrder);
router.patch('/updatePaymentStatus', authenticateMiddleware, orderController.updatePaymentStatus);


module.exports = router;

