const express = require('express');
const { createUser, loginUser, logoutUser, getUserDetails, updateUserPassword, updateUserProfile, deleteUser, getAllUserDetails } = require('../controller/userCntr');
const { isAuthenticatedUser, isAuthenticatedAdmin, accessAuthoriseAdmin } = require('../middleware/authoriseRole');

const router = express.Router();

router.route("/user/register").post(createUser);

router.route("/user/login").post(loginUser);

router.route("/user/logout").get(logoutUser);

router.route("/oneUser/:id").get( getUserDetails);

// Dummy Routes
router.route("/allUsers").get(getAllUserDetails);

router.route("/updateUserPass").put(isAuthenticatedUser, updateUserPassword);

router.route("/updateUsrProfile").put(isAuthenticatedUser, updateUserProfile);

// In Testing
router.route("/deleteUser/:id").delete(isAuthenticatedAdmin, accessAuthoriseAdmin("admin"), deleteUser);

module.exports = router