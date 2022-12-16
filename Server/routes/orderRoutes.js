const express = require('express');
const { newOrder } = require('../controller/orderCntr');
const { isAuthenticatedCustomer } = require('../middleware/authoriseRole');

const router = express.Router();

router.route("newOrder").post(isAuthenticatedCustomer, newOrder);

module.exports = router