const originalProduct = require("../model/productModel");
const ErrorHandler = require("../utls/errorHandler");
const catchAsyncError = require("../middleware/asyncError");
const ApiFeatures = require("../utls/apiFeatures");

// create product
exports.createProduct = catchAsyncError(async (req,res,next)=>{
    req.body.farmer = req.farmer.id;
    //console.log(req.farmer.id);

    const Product = await originalProduct.create(req.body);

    res.status(201).json({
        success:true,
        Product
    });
});

// Read All Products
exports.getAllProducts = async (req,res)=>{
    const products = await originalProduct.find();

    const productCount = await originalProduct.countDocuments();

    res.status(200).json({
        success:true,
        products,
        productCount
    });
}

// Dummy API
exports.getSomeProducts = async (req,res)=>{
    const products = await originalProduct.find({farmer:req.farmer.id});

    const productCount = await originalProduct.countDocuments();

    res.status(200).json({
        success:true,
        products,
        productCount
    });
}

// Read Single Product
exports.getSingleProducts = async (req,res,next)=>{
    const product = await originalProduct.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found !!",404));
    }

    res.status(200).json({
        success:true,
        product
    });
}

// Update Product
exports.updateProduct = async (req,res,next)=>{
    let product = await originalProduct.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found !!",404));
    }

    product = await originalProduct.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindandModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
}

// Delete Product
exports.deleteProduct = async (req,res,next)=>{
    const product = await originalProduct.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found !!",404));
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product removed successfully..."
    })
}

// Get Search/Filterd Products
exports.getSearchProducts = async (req,res)=>{
    const apiFeatures = new  ApiFeatures(originalProduct.find(),req.query)
    .search()
    .filter();
    const products = await apiFeatures.query;
    res.status(200).json({
        success:true,
        products
    });
}

// Give Reviews or Update Reviews
exports.createReview = catchAsyncError( async (req,res,next)=>{
    const {productId,rating,comment} = req.body;

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

    if(isReviewed){
        Product.reviews.forEach((rev) => {
            if(rev.uid.toString() === req.customer._id.toString()){
                (rev.rating = rating), (rev.comment = comment);
            }
        });
    }
    else{
        Product.reviews.push(review);
        Product.numOfReviews = Product.reviews.length
    }

    let avg = 0;
    Product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    Product.ratings = avg / Product.reviews.length;

    await Product.save({validateBeforeSave : false});

    res.status(200).json({
        success:true,
    });

})

// Get All Reviews
exports.getReviews = catchAsyncError( async (req,res,next)=>{
    const Products = await originalProduct.findById(req.query.pid);
    
    if(!Products) {
        return next(new ErrorHandler("No Product are there !!",404));
    }

    res.status(200).json({
        success:true,
        reviews:Products.reviews,
    });

})