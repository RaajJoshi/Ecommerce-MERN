const originalProduct = require("../model/productModel");
const originalOrder = require("../model/orderModel");
const ErrorHandler = require("../utls/errorHandler");
const catchAsyncError = require("../middleware/asyncError");
const ApiFeatures = require("../utls/apiFeatures");
const cloudinary = require("cloudinary");

// create product
exports.createProduct = catchAsyncError(async (req, res, next) => {

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.farmer = req.farmer.id;
    // console.log(req.farmer.id);

    const Product = await originalProduct.create(req.body);

    res.status(201).json({
        success: true,
        Product
    });
});

// Read All Products
exports.getAllProducts = async (req, res) => {
    const products = await originalProduct.find().populate(
        "farmer",
        "name"
    );

    const productCount = await originalProduct.countDocuments();

    res.status(200).json({
        success: true,
        products,
        productCount
    });
}

// Read Own Products
exports.getSomeProducts = async (req, res) => {
    const products = await originalProduct.find({ farmer: req.farmer.id });

    const productCount = await originalProduct.countDocuments();

    res.status(200).json({
        success: true,
        products,
        productCount
    });
}

// Read Single Product
exports.getSingleProducts = async (req, res, next) => {
    const product = await originalProduct.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found !!", 404));
    }

    res.status(200).json({
        success: true,
        product
    });
}

// Update Product
exports.updateProduct = async (req, res, next) => {
    let product = await originalProduct.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found !!", 404));
    }

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    product = await originalProduct.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindandModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}

// Delete Product
exports.deleteProduct = async (req, res, next) => {
    const product = await originalProduct.findById(req.params.id);

    const orders = await originalOrder.find({ orderStatus: "Processing" });

    orders.forEach(async (odr) => {
        odr.orderItems.forEach(async (so) => {
            if (so.product.toString() === req.params.id.toString()) {
                var itemsPrice = so.price * so.quant;
                odr.itemsPrice -= itemsPrice;
                odr.totalPrice -= itemsPrice;
                var indx = odr.orderItems.indexOf(so);
                odr.orderItems.splice(indx, 1);
            }
        });
        odr.save({ validateBeforeSave: false });
    });

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product removed successfully...",
    })
}

// Get Search/Filterd Products
exports.getSearchProducts = async (req, res) => {
    const apiFeatures = new ApiFeatures(originalProduct.find(), req.query)
        .search()
        .filter();
    let products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        products
    });
}

// Give Reviews or Update Reviews
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body;

    const review = {
        uname: req.customer.name,
        uid: req.customer._id,
        rating: Number(rating),
        comment,
    };
    //console.log(req.customer.name);
    //console.log(req.customer._id);

    const Product = await originalProduct.findById(productId);

    const isReviewed = Product.reviews.find(
        (rev) => rev.uid.toString() === req.customer._id.toString()
    );
    //console.log(isReviewed);

    if (isReviewed) {
        Product.reviews.forEach((rev) => {
            if (rev.uid.toString() === req.customer._id.toString()) {
                (rev.rating = rating), (rev.comment = comment);
            }
        });
    }
    else {
        Product.reviews.push(review);
        Product.numOfReviews = Product.reviews.length
    }

    let avg = 0;
    Product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    Product.ratings = avg / Product.reviews.length;

    await Product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });

})

// Get All Reviews
exports.getReviews = catchAsyncError(async (req, res, next) => {
    const Products = await originalProduct.findById(req.query.id);

    if (!Products) {
        return next(new ErrorHandler("No Product are there !!", 404));
    }

    res.status(200).json({
        success: true,
        reviews: Products.reviews,
    });

})