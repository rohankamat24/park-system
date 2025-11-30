const express = require('express');
const { createUser } = require('../Controller/userController');
const {login, logout, checkAuth} = require('../Controller/authController');
const { isLoggedIn } = require('../Validation/authValidator');
const { paymentHandler, paymentSuccess } = require('../Controller/paymentController');
const { createCustomer, getButtonIds, getButtonIds2 } = require('../Controller/bookingDataController');


const userRouter = express.Router();
const authRouter = express.Router();
const paymentRouter = express.Router();
const bookingDataRouter = express.Router();

userRouter.post('/', createUser);
authRouter.post('/login', login);
authRouter.post('/logout', isLoggedIn, logout);
authRouter.get('/check',  checkAuth);
paymentRouter.post('/orders', isLoggedIn, paymentHandler);
paymentRouter.post('/success', isLoggedIn, paymentSuccess);
bookingDataRouter.post('/create', isLoggedIn, createCustomer);
bookingDataRouter.get('/alpha/slots',  getButtonIds);
bookingDataRouter.get('/beta/slots',  getButtonIds2);

module.exports = {
    userRouter,
    authRouter,
    paymentRouter,
    bookingDataRouter
}