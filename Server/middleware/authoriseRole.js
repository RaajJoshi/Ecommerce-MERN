const originalFarmer = require("../model/farmerModel");
const originalCustomer = require("../model/customerModel");
const originalAdmin = require("../model/adminModel");
const originalUser = require("../model/userModel");
const ErrorHandler = require("../utls/errorHandler");
const catchAsyncError = require("../middleware/asyncError");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedFarmer = catchAsyncError( async (req,res,next) => {
    const { tokens } = req.cookies;

    //console.log(tokens);
    if(!tokens){
        return next(new ErrorHandler("please Login to access this page...",401));
    }

    const decodedData = jwt.verify(tokens,process.env.JWT_SECRET);

    req.farmer = await originalFarmer.findById(decodedData.id);

    next();

});

exports.isAuthenticatedCustomer = catchAsyncError( async (req,res,next) => {
    const { tokens } = req.cookies;

    //console.log(tokens);
    if(!tokens){
        return next(new ErrorHandler("please Login to access this page...",401));
    }

    const decodedData = jwt.verify(tokens,process.env.JWT_SECRET);

    req.customer = await originalCustomer.findById(decodedData.id);

    next();

});

exports.isAuthenticatedAdmin = catchAsyncError( async (req,res,next) => {
    const { tokens } = req.cookies;

    //console.log(tokens);
    if(!tokens){
        return next(new ErrorHandler("please Login to access this page...",401));
    }

    const decodedData = jwt.verify(tokens,process.env.JWT_SECRET);

    req.admin = await originalAdmin.findById(decodedData.id);

    next();

});

exports.isAuthenticatedUser = catchAsyncError( async (req,res,next) => {
    const { tokens } = req.cookies;

    //console.log(tokens);
    if(!tokens){
        return next(new ErrorHandler("please Login to access this page...",401));
    }

    const decodedData = jwt.verify(tokens,process.env.JWT_SECRET);

    req.user = await originalUser.findById(decodedData.id);

    next();

});


exports.accessAuthoriseRole = (...roles) => {
    return (req,res,next) => {
        //console.log(req.farmer.role);
        if(!roles.includes(req.farmer.role)){
            return next(new ErrorHandler("You are not allowed to access this page...",403));
        }

        next();
    };
};

exports.accessAuthoriseCustomer = (...roles) => {
    return (req,res,next) => {
        //console.log(req.farmer.role);
        if(!roles.includes(req.customer.role)){
            return next(new ErrorHandler("You are not allowed to access this page...",403));
        }

        next();
    };
};

exports.accessAuthoriseAdmin = (...roles) => {
    return (req,res,next) => {
        //console.log(req.farmer.role);
        if(!roles.includes(req.admin.role)){
            return next(new ErrorHandler("You are not allowed to access this page...",403));
        }

        next();
    };
};

exports.accessAuthoriseUser = (...roles) => {
    return (req,res,next) => {
        //console.log(req.farmer.role);
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler("You are not allowed to access this page...",403));
        }

        next();
    };
};