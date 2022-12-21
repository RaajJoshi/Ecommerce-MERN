const originalAdmin = require("../model/adminModel");
const ErrorHandler = require("../utls/errorHandler");
const catchAsyncError = require("../middleware/asyncError");
const bcrypt = require("bcryptjs");
const sendToken = require("../utls/sendToken");

// Register Admin
exports.createAdmin = catchAsyncError( async (req,res,next)=>{
    const {name,email,password,phoneno,city,role} = req.body;

    const Admin = await originalAdmin.create({
        name,email,password,phoneno,city,role
    });

    sendToken(Admin,201,res);

})

// Login Admin
exports.loginAdmin = catchAsyncError(async (req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("plaese enter Email and Password",400));
    }

    const Admin = await originalAdmin.findOne({ email }).select("+password");

    if(!Admin){
        return next(new ErrorHandler("Invalid Email or Password !!",401));
    }

    const isTruePassword = await bcrypt.compare(password,Admin.password);
    if(!isTruePassword){
        return next(new ErrorHandler("Invalid Email or Password !!",401));
    }

    sendToken(Admin,200,res);

});

// Logout Admin
exports.logoutAdmin = catchAsyncError(async (req,res,next)=>{
    res.cookie("tokens",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged out Successfully..."
    });
});
