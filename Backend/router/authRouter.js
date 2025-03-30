const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { registerUser, loginUser, getUserProfile, debugToken, checkUserExists, testTokenGeneration} = require("../controllers/authController");

// Need to use the authController to handle the requests

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/profile", authMiddleware, getUserProfile);
router.get("/debug-token", authMiddleware, debugToken);
router.get("/check/:userId", checkUserExists);
router.get("/test-token", testTokenGeneration);
module.exports = router;



