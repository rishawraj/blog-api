const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");

// api/users

// GET all user
router.get("/", userControllers.users_get);

// get single user
router.get("/:id", userControllers.get_user);

//  POST signup
router.post("/signup", userControllers.signup_post);

// login
router.post("/login", userControllers.login_post);

router.post("/logout", userControllers.logout);

module.exports = router;
