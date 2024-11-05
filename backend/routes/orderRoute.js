import express from 'express'
import { placeOrder , placeOrderRazorpay, placeOrderStripe,allOrder,userOrder,updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
const orderRouter = express.Router();


//  Admin Features
orderRouter.post('/list' , adminAuth,allOrder);
orderRouter.post('/status' , adminAuth,updateStatus);


// Payment Freature
orderRouter.post('/place' ,authUser, placeOrder);
orderRouter.post('/stripe' ,authUser, placeOrderStripe);
orderRouter.post('/rezorpay' ,authUser, placeOrderRazorpay);

// User Feature

orderRouter.post('/userorders',authUser,userOrder);

export default orderRouter;