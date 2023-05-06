const originalAdmin = require("../model/adminModel");
const ErrorHandler = require("../utls/errorHandler");
const catchAsyncError = require("../middleware/asyncError");
const bcrypt = require("bcryptjs");
const sendToken = require("../utls/sendToken");
const cloudinary = require("cloudinary");

// Register Admin
exports.createAdmin = catchAsyncError( async (req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const {name,email,password,phoneno,city,role} = req.body;

    const Admin = await originalAdmin.create({
        name,email,password,phoneno,city,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        role
    });

    sendToken(Admin,201,res);

})

// Login Admin
exports.loginAdmin = catchAsyncError(async (req,res,next)=>{
    const {email,password,status} = req.body;

    if (!status) {
        return next(new ErrorHandler("pls, Select Role", 400));
    }

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

// Get Admin
exports.getAdmnDetails = catchAsyncError(async (req,res,next)=>{
    const oneAdmin = await originalAdmin.findById(req.admin.id);

    res.status(200).json({
        success: true,
        oneAdmin,
    });
});

// Update Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newDetails = {
        name: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno,
        city: req.body.city
    };

    const admin = await originalAdmin.findByIdAndUpdate(req.admin.id, newDetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully..."
    });

})

// Update Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const oneAdmin = await originalAdmin.findById(req.farmer.id).select("+password");

    const isTruePassword = await bcrypt.compare(req.body.oldPassword, oneAdmin.password);
    if (!isTruePassword) {
        return next(new ErrorHandler("Old Password is Incorrect !!", 401));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Both Password must be same !!", 400));
    }

    oneAdmin.password = req.body.newPassword;
    await oneAdmin.save();

    sendToken(oneAdmin, 200, res);

});

// Logout Admin
exports.logoutAdmin = catchAsyncError(async (req,res,next)=>{
    console.log("admin");
    res.cookie("tokens",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged out Successfully..."
    });
});
