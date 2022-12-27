const originalUser = require("../model/userModel");
const originalProduct = require("../model/productModel");
const originalOrder = require("../model/orderModel");
const ErrorHandler = require("../utls/errorHandler");
const catchAsyncError = require("../middleware/asyncError");
const bcrypt = require("bcryptjs");
const sendToken = require("../utls/sendToken");

// Register User
exports.createUser = catchAsyncError(async (req,res,next)=>{
    const {name,email,password,phoneno,city,role} = req.body;

    const User = await originalUser.create({
        name,email,password,phoneno,city
    });

    //sendToken(User,201,res);
    res.status(200).json({
        success:true,
        message:"Registered Successfully..."
    });

});

// Login User
exports.loginUser = catchAsyncError(async (req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("plaese enter Email and Password",400));
    }

    const User = await originalUser.findOne({ email }).select("+password");

    if(!User){
        return next(new ErrorHandler("Invalid Email or Password !!",401));
    }

    const isTruePassword = await bcrypt.compare(password,User.password);
    if(!isTruePassword){
        return next(new ErrorHandler("Invalid Email or Password !!",401));
    }

    sendToken(User,200,res);

});

// Logout User
exports.logoutUser = catchAsyncError(async (req,res,next)=>{
    res.cookie("tokens",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged out Successfully..."
    });
});

// Get User Details
exports.getUserDetails = catchAsyncError( async (req,res,next)=>{
    const oneUser = await originalUser.findById(req.user.id);

    res.status(200).json({
        success:true,
        oneUser,
    });
})

// Dummy API
exports.getAllUserDetails = catchAsyncError( async (req,res,next)=>{
    const allUsers = await originalUser.find();

    res.status(200).json({
        success:true,
        allUsers,
    });
})


// Update Password
exports.updateUserPassword = catchAsyncError( async (req,res,next)=>{
    const oneUser = await originalUser.findById(req.user.id).select("+password");

    const isTruePassword = await bcrypt.compare(req.body.oldPassword,oneUser.password);
    if(!isTruePassword){
        return next(new ErrorHandler("Old Password is Incorrect !!",401));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Both Password must be same !!",400));
    }

    oneUser.password = req.body.newPassword;
    await oneUser.save();

    sendToken(oneUser,200,res);

})

// Update Profile
exports.updateUserProfile = catchAsyncError( async (req,res,next)=>{
    const newDetails = {
        name:req.body.name,
        email:req.body.email,
        phoneno:req.body.phoneno,
        city:req.body.city
    };

    const User = await originalUser.findByIdAndUpdate(req.user.id,newDetails,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        message:"Profile Updated Successfully..."
    });

})

// Delete User
exports.deleteUser = catchAsyncError( async (req,res,next)=>{
    const user = await originalUser.findById(req.params.id);

    const products = await originalProduct.find({farmer:req.params.id});

    products.forEach( async (prod) => {
        await updateOrderQuantity(prod._id);
        await prod.remove();
    });

    user.remove();

    res.status(200).json({
        success:true,
        message:"User removed successfully...",
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