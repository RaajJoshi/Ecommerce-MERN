const originalOrder = require("../model/orderModel");
const originalProduct = require("../model/productModel");
const ErrorHandler = require("../utls/errorHandler");
const catchAsyncErrors = require("../middleware/authoriseRole");

// Create Order
exports.newOrder = catchAsyncErrors( async (req,res,next)=>{
    const {
        transportInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        transportPrice,
        totalPrice,
    } = req.body;

    const order = await originalOrder.create({
        transportInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        transportPrice,
        totalPrice,
        paidAt:Date.now(),
        customer:req.customer._id,
    });

    res.status(201).json({
        success:true,
        order,
    });

})