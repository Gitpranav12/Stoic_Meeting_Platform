const express = require("express");
// const { registerUser, loginUser, googleLogin } = require("../controllers/authController");
const { registerUser, loginUser, googleLogin, sendOtp, verifyOtp, resetPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.post("/forgot-password", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;