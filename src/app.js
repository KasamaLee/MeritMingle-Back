require('dotenv').config();
const express = require('express')
const cors = require('cors');
const morgan = require('morgan');

const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const cartRoute = require('./routes/cartRoute')

// ---- APP ----
const app = express()

app.use(cors());
app.use(morgan('tiny'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ---- ROUTE ----
app.use('/auth', authRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)
// app.use('/admin')
// app.use('/user')

// ---- ERROR ----
// const notFoundMiddleware =require('./middlewares/not-found');
const errorMiddleware = require ('./middlewares/error');
const { product } = require('./models/prisma');

app.use(errorMiddleware)

// ---- SERVER ----
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(PORT, () => (`RUNNING ON PORT : ${PORT}`))
})