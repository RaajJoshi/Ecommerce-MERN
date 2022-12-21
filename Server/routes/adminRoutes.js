const express = require('express');
const { createAdmin, loginAdmin, logoutAdmin } = require('../controller/adminCntr');


const router = express.Router();

router.route("/admin/register").post(createAdmin);

router.route("/loginAdmin").post(loginAdmin);

router.route("/logoutAdmin").get(logoutAdmin);

module.exports = router