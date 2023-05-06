const originalOrder = require("../model/orderModel");
const originalProduct = require("../model/productModel");
const ErrorHandler = require("../utls/errorHandler");
const catchAsyncErrors = require("../middleware/asyncError");

// Create Order
exports.newOrder = catchAsyncErrors( async (req,res,next)=>{
    const {
        transportInfo,
        orderItems,
        paymentInfo,
        customer,
        itemsPrice,
        taxPrice,
        transportPrice,
        totalPrice,
    } = req.body;

    console.log(req.body);

    const order = await originalOrder.create({
        transportInfo,
        orderItems,
        paymentInfo,
        customer,
        itemsPrice,
        taxPrice,
        transportPrice,
        totalPrice,
        paidAt:Date.now(),
    });

    order.orderItems.forEach( async (odr) => {
        await updateStock(odr.product,odr.quant);
    });

    res.status(201).json({
        success:true,
        order,
    });

});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    
    console.log(req.params.id);
    const order = await originalOrder.findById(req.params.id).populate(
        "customer",
        "name"
    );
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });
  

// Get All Orders
exports.getAllOrders = catchAsyncErrors( async (req,res,next)=>{
    const orders = await originalOrder.find().populate(
        "customer",
        "name email"
    );

    res.status(200).json({
        success:true,
        orders,
    });
})

// Get Own Orders
exports.getMyOrders = catchAsyncErrors( async (req,res,next)=>{
    console.log("Customer : ",req.customer._id);
    const orders = await originalOrder.find({customer:req.customer._id}).populate(
        "customer",
        "name email"
    );

    res.status(200).json({
        success:true,
        orders,
    });
})

// Update Order
exports.updateOrder = catchAsyncErrors( async (req,res,next)=>{
    const order = await originalOrder.findById(req.params.id);

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    });
});
async function updateStock(id,quantity){
    const product = await originalProduct.findById(id);

    product.quantity -= quantity;

    product.save({validateBeforeSave:false});
}

// Delete Order
exports.deleteOrder = catchAsyncErrors( async (req,res,next)=>{
    const order = await originalOrder.findById(req.params.id);

    if(order.status === "Delivered"){
        return next(new ErrorHandler("Order is Delivered, You can't delete it now !!",404));
    }

    order.orderItems.forEach( async (odr) => {
        await updateStockDelete(odr.product,odr.quant);
    });

    await order.remove();

    res.status(200).json({
        success:true,
    });
});
async function updateStockDelete(id,quantity){
    const product = await originalProduct.findById(id);

    product.quantity += quantity;

    product.save({validateBeforeSave:false});
}