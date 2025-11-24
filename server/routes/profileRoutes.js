const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const {
  getProfile,
  updateProfile,
  uploadAvatar,
  updatePreferences,
  updateNotifications,
  changePassword,
} = require("../controllers/profileController");

// Get profile
router.get("/", auth, getProfile);

// Update name/email
router.put("/", auth, updateProfile);

// Upload avatar (multipart/form-data, field name "avatar")
router.post("/photo", auth, upload.single("avatar"), uploadAvatar);

// Preferences
router.put("/preferences", auth, updatePreferences);

// Notifications
router.put("/notifications", auth, updateNotifications);

// Change password
router.put("/change-password", auth, changePassword);

module.exports = router;
