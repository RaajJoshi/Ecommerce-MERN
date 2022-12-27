const express = require('express');
const { createFarmer, loginFarmer, logoutFarmer, getFarmerDetails, updatePassword, updateProfile, deleteFarmer } = require('../controller/farmerCntr');
const { isAuthenticatedAdmin, accessAuthoriseAdmin, isAuthenticatedFarmer } = require('../middleware/authoriseRole');

const router = express.Router();

router.route("/farmer/register").post(createFarmer);

router.route("/farmer/login").post(loginFarmer);

router.route("/farmer/logout").get(logoutFarmer);

router.route("/oneFarmer").get(isAuthenticatedFarmer, getFarmerDetails);

router.route("/updateFarmerPass").put(isAuthenticatedFarmer, updatePassword);

router.route("/updateFarmProfile").put(isAuthenticatedFarmer, updateProfile);

router.route("/deleteFarmer/:id").delete(isAuthenticatedAdmin, accessAuthoriseAdmin("admin"), deleteFarmer);

module.exports = router