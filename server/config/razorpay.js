const razorpay = require("razorpay");

// Initialize Razorpay instance conditionally
let razorpayInstance;

if (process.env.RAZORPAY_KEY && process.env.RAZORPAY_SECRET) {
    razorpayInstance = new razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
    });
    console.log("Razorpay initialized.");
} else {
    console.warn("Razorpay credentials are missing.");
}

exports.instance = razorpayInstance;
