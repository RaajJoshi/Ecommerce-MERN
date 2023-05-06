const express = require('express');
const { createAdmin, loginAdmin, logoutAdmin, getAdmnDetails, updateProfile, updatePassword } = require('../controller/adminCntr');


const router = express.Router();

router.route("/admin/register").post(createAdmin);

router.route("/loginAdmin").post(loginAdmin);

router.route("/logoutAdmin").get(logoutAdmin);

router.route("/getAdmin").get(getAdmnDetails);

router.route("/updtAdmnProf").put(updateProfile);

router.route("/updtAdmnPass").put(updatePassword);

module.exports = router