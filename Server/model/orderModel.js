const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    transportInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
        phoneno: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quant: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
        },
    ],
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "Customer",
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        }
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    taxPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    transportPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    orderStatus: {
        type: String,
        default: "Processing",
        required: true,
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model("Order", orderSchema);