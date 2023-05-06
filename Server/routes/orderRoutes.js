const express = require('express');
const { newOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder, getSingleOrder } = require('../controller/orderCntr');
const { isAuthenticatedCustomer, isAuthenticatedUser, accessAuthoriseRole, isAuthenticatedAdmin, accessAuthoriseAdmin } = require('../middleware/authoriseRole');

const router = express.Router();

router.route("/makeOrder").post(isAuthenticatedCustomer, newOrder);

router.route("/order/:id").get(getSingleOrder);

router.route("/allOrders").get(getAllOrders);

router.route("/myOrders").get(isAuthenticatedCustomer, getMyOrders);

router.route("/updateOrder/:id").put( updateOrder);

router.route("/deleteOrder/:id").delete( deleteOrder);

module.exports = router