const express = require('express');
const { createCustomer, loginCustomer, logoutCustomer, getCustomerDetails, updateCustomerPassword, updateCustomerProfile, deleteCustomer, getAllCustomerDetails } = require('../controller/customerCntr');
const { isAuthenticatedCustomer, isAuthenticatedUser, isAuthenticatedAdmin, accessAuthoriseAdmin } = require('../middleware/authoriseRole');



const router = express.Router();

router.route("/customer/register").post(createCustomer);

router.route("/customer/login").post(loginCustomer);

router.route("/customer/logout").get(logoutCustomer);

router.route("/allCustomers").get( getAllCustomerDetails);

router.route("/oneCustomer").get(isAuthenticatedCustomer, getCustomerDetails);

router.route("/updateCustomerPass").put(isAuthenticatedCustomer, updateCustomerPassword);

router.route("/updateCustProfile").put(isAuthenticatedCustomer, updateCustomerProfile);

router.route("/deleteCustomer/:id").delete( deleteCustomer);

module.exports = router