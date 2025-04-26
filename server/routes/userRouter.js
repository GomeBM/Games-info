const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated.js");
const userController = require("../controllers/userController.js");

const router = express.Router();

// Register a new user
router.post("/register", userController.registerUser);

// Login a user
router.post("/login", userController.loginUser);

// Get user profile (protected route)
router.get("/profile", isAuthenticated, userController.getUserProfile);

module.exports = router;
