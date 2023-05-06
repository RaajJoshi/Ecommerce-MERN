const originalFarmer = require("../model/farmerModel");
const originalProduct = require("../model/productModel");
const originalOrder = require("../model/orderModel");
const ErrorHandler = require("../utls/errorHandler");
const catchAsyncError = require("../middleware/asyncError");
const bcrypt = require("bcryptjs");
const sendToken = require("../utls/sendToken");
const cloudinary = require("cloudinary");

// Register Farmer
exports.createFarmer = catchAsyncError(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const { name, email, password, phoneno, city, role } = req.body;

    if(!name || !email || !password || !phoneno || !city || !role){
        return next(new ErrorHandler("pls, Ente all fields", 400));
    }

    const Farmer = await originalFarmer.create({
        name, email, password, phoneno, city,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        role
    });

    sendToken(Farmer, 201, res);
});

// Login Farmer
exports.loginFarmer = catchAsyncError(async (req, res, next) => {
    const { email, password, status } = req.body;

    if (!status) {
        return next(new ErrorHandler("pls, Select Role", 400));
    }

    if (!email || !password) {
        return next(new ErrorHandler("plaese enter Email and Password", 400));
    }

    const Farmer = await originalFarmer.findOne({ email }).select("+password");

    if (!Farmer) {
        return next(new ErrorHandler("Invalid Email or Password !!", 401));
    }

    const isTruePassword = await bcrypt.compare(password, Farmer.password);
    if (!isTruePassword) {
        return next(new ErrorHandler("Invalid Email or Password !!", 401));
    }

    sendToken(Farmer, 200, res);

});

// Logout Farmer
exports.logoutFarmer = catchAsyncError(async (req, res, next) => {
    console.log("farmer");
    res.cookie("tokens", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out Successfully..."
    });
});

// Get Farmer Details
exports.getFarmerDetails = catchAsyncError(async (req, res, next) => {
    const oneFarmer = await originalFarmer.findById(req.farmer.id);

    res.status(200).json({
        success: true,
        oneFarmer,
    });
})


// Get All Farmer
exports.getAllFarmer = catchAsyncError(async (req, res, next) => {
    const allFarmers = await originalFarmer.find();

    res.status(200).json({
        success: true,
        allFarmers,
    });
})

// Update Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const oneFarmer = await originalFarmer.findById(req.farmer.id).select("+password");

    const isTruePassword = await bcrypt.compare(req.body.oldPassword, oneFarmer.password);
    if (!isTruePassword) {
        return next(new ErrorHandler("Old Password is Incorrect !!", 401));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Both Password must be same !!", 400));
    }

    oneFarmer.password = req.body.newPassword;
    await oneFarmer.save();

    sendToken(oneFarmer, 200, res);

})

// Update Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newDetails = {
        name: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno,
        city: req.body.city
    };

    if (req.body.avatar !== "") {
        const farmer = await originalFarmer.findById(req.farmer.id);

        const imageId = farmer.avatar.public_id;

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

    const farmer = await originalFarmer.findByIdAndUpdate(req.farmer.id, newDetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully..."
    });

})

// Delete Farmer
exports.deleteFarmer = catchAsyncError(async (req, res, next) => {
    const farmer = await originalFarmer.findById(req.params.id);

    const products = await originalProduct.find({ farmer: req.params.id });

    products.forEach(async (prod) => {
        await updateOrderQuantity(prod._id);
        await prod.remove();
    });

    const imageId = farmer.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    farmer.remove();

    res.status(200).json({
        success: true,
        message: "Farmer removed successfully...",
    });
})
async function updateOrderQuantity(id) {
    const orders = await originalOrder.find({ orderStatus: "Processing" });

    orders.forEach(async (odr) => {
        odr.orderItems.forEach(async (so) => {
            if (so.product.toString() === id.toString()) {
                var itemsPrice = so.price * so.quant;
                odr.itemsPrice -= itemsPrice;
                odr.totalPrice -= itemsPrice;
                var indx = odr.orderItems.indexOf(so);
                odr.orderItems.splice(indx, 1);
            }
        });
        odr.save({ validateBeforeSave: false });
    });
}