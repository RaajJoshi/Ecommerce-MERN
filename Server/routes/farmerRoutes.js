const express = require('express');
const { createFarmer, loginFarmer, logoutFarmer, getFarmerDetails, updatePassword, updateProfile } = require('../controller/farmerCntr');
const { isAuthenticatedUser } = require('../middleware/authoriseRole');

const router = express.Router();

router.route("/farmer/register").post(createFarmer);

router.route("/farmer/login").post(loginFarmer);

router.route("/farmer/logout").get(logoutFarmer);

router.route("/oneFarmer").get(isAuthenticatedUser, getFarmerDetails);

router.route("/updateFarmerPass").put(isAuthenticatedUser, updatePassword);

router.route("/updateFarmProfile").put(isAuthenticatedUser, updateProfile);

module.exports = router