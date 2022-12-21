const express = require('express');
const { createFarmer, loginFarmer, logoutFarmer, getFarmerDetails, updatePassword, updateProfile, deleteFarmer } = require('../controller/farmerCntr');
const { isAuthenticatedUser, isAuthenticatedAdmin, accessAuthoriseAdmin } = require('../middleware/authoriseRole');

const router = express.Router();

router.route("/farmer/register").post(createFarmer);

router.route("/farmer/login").post(loginFarmer);

router.route("/farmer/logout").get(logoutFarmer);

router.route("/oneFarmer").get(isAuthenticatedUser, getFarmerDetails);

router.route("/updateFarmerPass").put(isAuthenticatedUser, updatePassword);

router.route("/updateFarmProfile").put(isAuthenticatedUser, updateProfile);

// In Testing
router.route("/deleteFarmer/:id").delete(isAuthenticatedAdmin, accessAuthoriseAdmin("admin"), deleteFarmer);

module.exports = router