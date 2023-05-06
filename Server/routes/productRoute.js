const express = require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct, getSingleProducts, getSearchProducts, getSomeProducts, createReview, getReviews } = require('../controller/productCntr');
const { isAuthenticatedUser, accessAuthoriseRole, isAuthenticatedCustomer, accessAuthoriseCustomer, isAuthenticatedAdmin, accessAuthoriseAdmin, isAuthenticatedFarmer } = require('../middleware/authoriseRole');

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/someproducts").get(isAuthenticatedFarmer, accessAuthoriseRole("farmer"), getSomeProducts);

router.route("/searchProduct").get(getSearchProducts);

router.route("/product/:id").get(getSingleProducts);

router.route("/product/new").post(isAuthenticatedFarmer, accessAuthoriseRole("farmer"), createProduct);

router.route("/product/:id").put(updateProduct);

router.route("/deleteProduct/:id").delete( deleteProduct);

router.route("/reviewProduct").put(isAuthenticatedCustomer, createReview);

router.route("/getReviews").get(isAuthenticatedFarmer, getReviews);

module.exports = router