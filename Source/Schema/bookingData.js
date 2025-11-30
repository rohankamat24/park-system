const mongoose = require('mongoose');

const bookingDataSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name can't exceed 50 characters"]
    },

    Email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
        required: [true, "Email address cannot be empty"]
    },
    vehicleType: {
        type: String,
        required: [true, "Vehicle type is required"],
        trim: true
    },  
    ButtonId: {
        type: String,
        unique: [true, "ButtonID already exists"],
        required: [true, "Button ID is required"],
        trim: true
    },

    PaymentId: {
        type: String,
        unique: true,
        required: [true, "Payment ID is required"],
        trim: true
    },

    Booking_Date: {
        type: String,
        required: [true, "Booking date is required"],
        trim: true
    },

    Price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    },
    complexName: {
        type: String,
        required: [true, "Complex name is required"],
        trim: true
    },

}, {timestamps: true, versionKey: false});

const BookingData = mongoose.model("BookingData", bookingDataSchema);

module.exports = BookingData;
