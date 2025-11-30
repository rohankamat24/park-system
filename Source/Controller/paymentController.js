require("dotenv").config();
const Razorpay = require("razorpay");


async function paymentHandler(req, res){

    console.log(req.body);
    console.log("i am payment controller")

    console.log(process.env.RAZORPAY_KEY_ID);
    console.log(process.env.RAZORPAY_SECRET);
    
    
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        // console.log("instance" , instance);

        const options = {
            amount: req.body.amount, // amount in smallest currency unit
            currency: "INR",
            receipt: req.body.receipt,
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function paymentSuccess(req, res){
    console.log(req.body);
    res.json({ message: "Payment Successful", success: true });
}


module.exports = {
    paymentSuccess,
    paymentHandler
}