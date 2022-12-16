const express = require('express');
const { createCustomer, loginCustomer, logoutCustomer, getCustomerDetails, updateCustomerPassword, updateCustomerProfile } = require('../controller/customerCntr');
const { isAuthenticatedCustomer } = require('../middleware/authoriseRole');



const router = express.Router();

router.route("/customer/register").post(createCustomer);

router.route("/customer/login").post(loginCustomer);

router.route("/customer/logout").get(logoutCustomer);

router.route("/oneCustomer").get(isAuthenticatedCustomer, getCustomerDetails);

router.route("/updateCustomerPass").put(isAuthenticatedCustomer, updateCustomerPassword);

router.route("/updateCustProfile").put(isAuthenticatedCustomer, updateCustomerProfile);

module.exports = router