const express = require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct, getSingleProducts, getSearchProducts, getSomeProducts, createReview, getReviews } = require('../controller/productCntr');
const { isAuthenticatedUser, accessAuthoriseRole, isAuthenticatedCustomer, accessAuthoriseCustomer } = require('../middleware/authoriseRole');

const router = express.Router();

router.route("/products").get(getAllProducts);

// Dummy Route
router.route("/someproducts").get(isAuthenticatedUser, accessAuthoriseRole("farmer"),  getSomeProducts);

router.route("/product").get(getSearchProducts);

router.route("/product/:id").get(getSingleProducts);

router.route("/product/new").post(isAuthenticatedUser, createProduct);

router.route("/product/:id").put(updateProduct);

router.route("/product/:id").delete(deleteProduct);

router.route("/reviewProduct").put(isAuthenticatedCustomer, createReview);

router.route("/getReviews").get(isAuthenticatedUser, getReviews);

module.exports = router