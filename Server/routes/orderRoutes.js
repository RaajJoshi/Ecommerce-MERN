const express = require('express');
const { newOrder, getMyOrders, getAllOrders, updateOrder, deleteOrder } = require('../controller/orderCntr');
const { isAuthenticatedCustomer, isAuthenticatedUser, accessAuthoriseRole, isAuthenticatedAdmin, accessAuthoriseAdmin } = require('../middleware/authoriseRole');

const router = express.Router();

router.route("/makeOrder").post(isAuthenticatedCustomer, newOrder);

router.route("/allOrders").get(isAuthenticatedUser, accessAuthoriseRole("farmer"), getAllOrders);

router.route("/myOrders").get(isAuthenticatedCustomer, getMyOrders);

router.route("/updateOrder/:id").put(isAuthenticatedUser, updateOrder);

// In Testing
router.route("/deleteOrder/:id").delete(isAuthenticatedAdmin, accessAuthoriseAdmin("admin"), deleteOrder);

module.exports = router