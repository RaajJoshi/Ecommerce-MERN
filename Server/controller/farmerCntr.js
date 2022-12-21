const originalFarmer = require("../model/farmerModel");
const originalProduct = require("../model/productModel");
const originalOrder = require("../model/orderModel");
const ErrorHandler = require("../utls/errorHandler");
const catchAsyncError = require("../middleware/asyncError");
const bcrypt = require("bcryptjs");
const sendToken = require("../utls/sendToken");

// Register Farmer
exports.createFarmer = catchAsyncError(async (req,res,next)=>{
    const {name,email,password,phoneno,city,role} = req.body;

    const Farmer = await originalFarmer.create({
        name,email,password,phoneno,city,role
    });

    sendToken(Farmer,201,res);
});

// Login Farmer
exports.loginFarmer = catchAsyncError(async (req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("plaese enter Email and Password",400));
    }

    const Farmer = await originalFarmer.findOne({ email }).select("+password");

    if(!Farmer){
        return next(new ErrorHandler("Invalid Email or Password !!",401));
    }

    const isTruePassword = await bcrypt.compare(password,Farmer.password);
    if(!isTruePassword){
        return next(new ErrorHandler("Invalid Email or Password !!",401));
    }

    sendToken(Farmer,200,res);

});

// Logout Farmer
exports.logoutFarmer = catchAsyncError(async (req,res,next)=>{
    res.cookie("tokens",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged out Successfully..."
    });
});

// Get Farmer Details
exports.getFarmerDetails = catchAsyncError( async (req,res,next)=>{
    const oneFarmer = await originalFarmer.findById(req.farmer.id);

    res.status(200).json({
        success:true,
        oneFarmer,
    });
})

// Update Password
exports.updatePassword = catchAsyncError( async (req,res,next)=>{
    const oneFarmer = await originalFarmer.findById(req.farmer.id).select("+password");

    const isTruePassword = await bcrypt.compare(req.body.oldPassword,oneFarmer.password);
    if(!isTruePassword){
        return next(new ErrorHandler("Old Password is Incorrect !!",401));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Both Password must be same !!",400));
    }

    oneFarmer.password = req.body.newPassword;
    await oneFarmer.save();

    sendToken(oneFarmer,200,res);

})

// Update Profile
exports.updateProfile = catchAsyncError( async (req,res,next)=>{
    const newDetails = {
        name:req.body.name,
        email:req.body.email,
        phoneno:req.body.phoneno,
        city:req.body.city
    };

    const farmer = await originalFarmer.findByIdAndUpdate(req.farmer.id,newDetails,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        message:"Profile Updated Successfully..."
    });

})

// Delete Farmer
exports.deleteFarmer = catchAsyncError( async (req,res,next)=>{
    const farmer = await originalFarmer.findById(req.params.id);

    const products = await originalProduct.find({farmer:req.params.id});

    products.forEach( async (prod) => {
        await updateOrderQuantity(prod._id);
        await prod.remove();
    });

    farmer.remove();

    res.status(200).json({
        success:true,
        message:"Farmer removed successfully...",
    });
})
async function updateOrderQuantity(id){
    const orders = await originalOrder.find({orderStatus:"Processing"});

    orders.forEach( async (odr) => {
        odr.orderItems.forEach( async (so) => {
            if(so.product.toString() === id.toString()){
                var itemsPrice = so.price * so.quantity;
                odr.itemsPrice -= itemsPrice;
                odr.totalPrice -= itemsPrice;
                var indx = odr.orderItems.indexOf(so);            
                odr.orderItems.splice(indx,1);
            }
        });
        odr.save({validateBeforeSave:false});
    });
}