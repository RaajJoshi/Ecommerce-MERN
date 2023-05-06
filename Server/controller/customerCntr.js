const originalCustomer = require("../model/customerModel");
const originalOrder = require("../model/orderModel");
const originalProduct = require("../model/productModel");
const ErrorHandler = require("../utls/errorHandler");
const catchAsyncError = require("../middleware/asyncError");
const bcrypt = require("bcryptjs");
const sendToken = require("../utls/sendToken");
const cloudinary = require("cloudinary");

// Register Customer
exports.createCustomer = catchAsyncError(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const { name, email, password, phoneno, city, role } = req.body;

    if(!name || !email || !password || !phoneno || !city || !role){
        return next(new ErrorHandler("pls, Ente all fields", 400));
    }

    const Customer = await originalCustomer.create({
        name, email, password, phoneno, city,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        role
    });

    sendToken(Customer, 201, res);
});

// Login Customer
exports.loginCustomer = catchAsyncError(async (req, res, next) => {
    const { email, password, status } = req.body;

    if (!status) {
        return next(new ErrorHandler("pls, Select Role", 400));
    }

    if (!email || !password) {
        return next(new ErrorHandler("plaese enter Email and Password", 400));
    }

    const Customer = await originalCustomer.findOne({ email }).select("+password");

    if (!Customer) {
        return next(new ErrorHandler("Invalid Email or Password !!", 401));
    }

    const isTruePassword = await bcrypt.compare(password, Customer.password);
    if (!isTruePassword) {
        return next(new ErrorHandler("Invalid Email or Password !!", 401));
    }

    sendToken(Customer, 200, res);

});

// Logout Customer
exports.logoutCustomer = catchAsyncError(async (req, res, next) => {
    console.log("customer");
    res.cookie("tokens", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out Successfully..."
    });
});

// Get All Customer
exports.getAllCustomerDetails = catchAsyncError(async (req, res, next) => {
    const allCustomer = await originalCustomer.find();

    res.status(200).json({
        success: true,
        allCustomer,
    });
})

// Get Customer Details
exports.getCustomerDetails = catchAsyncError(async (req, res, next) => {
    const oneCustomer = await originalCustomer.findById(req.customer.id);

    res.status(200).json({
        success: true,
        oneCustomer,
    });
})

// Update Password
exports.updateCustomerPassword = catchAsyncError(async (req, res, next) => {
    const oneCustomer = await originalCustomer.findById(req.customer.id).select("+password");

    const isTruePassword = await bcrypt.compare(req.body.oldPassword, oneCustomer.password);
    if (!isTruePassword) {
        return next(new ErrorHandler("Old Password is Incorrect !!", 401));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Both Password must be same !!", 400));
    }

    oneCustomer.password = req.body.newPassword;
    await oneCustomer.save();

    sendToken(oneCustomer, 200, res);

})

// Update Profile
exports.updateCustomerProfile = catchAsyncError(async (req, res, next) => {
    const newDetails = {
        name: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno,
        city: req.body.city
    };

    if (req.body.avatar !== "") {
        const customer = await originalCustomer.findById(req.customer.id);

        const imageId = customer.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newDetails.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const customer = await originalCustomer.findByIdAndUpdate(req.customer.id, newDetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully..."
    });

})

// Delete Customer
exports.deleteCustomer = catchAsyncError(async (req, res, next) => {
    const customer = await originalCustomer.findById(req.params.id);

    const orders = await originalOrder.find({ customer: req.params.id });

    orders.forEach(async (odr) => {
        await orderDelete(odr._id);
    });

    const imageId = customer.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    customer.remove();

    res.status(200).json({
        success: true,
        message: "Customer removed successfully...",
    });
})
async function orderDelete(id) {
    const order = await originalOrder.findById(id);

    order.orderItems.forEach(async (so) => {
        await quantityUpdate(so.product, so.quan);
    });

    await order.remove();

}
async function quantityUpdate(id, quantity) {
    const product = await originalProduct.findById(id);

    product.quantity += quantity;

    product.save({ validateBeforeSave: false });

}