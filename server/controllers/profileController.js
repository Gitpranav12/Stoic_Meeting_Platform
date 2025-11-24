const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET /api/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otp -otpExpire -__v");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// PUT /api/profile
// body: { fullName, email }
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    // basic check: ensure email not used by other user
    if (email) {
      const other = await User.findOne({ email: email.toLowerCase(), _id: { $ne: req.user.id } });
      if (other) return res.status(400).json({ error: "Email already in use" });
    }

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { fullName, email } },
      { new: true, runValidators: true, context: "query" }
    ).select("-password -otp -otpExpire -__v");

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/profile/photo
// multipart form; field: avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const filePath = `/uploads/profilePhotos/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { profilePhoto: filePath } },
      { new: true }
    ).select("-password -otp -otpExpire -__v");

    res.json({ message: "Profile photo updated", profilePhoto: user.profilePhoto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// PUT /api/profile/preferences
// body: { darkMode, autoJoinWithVideo, soundEffects }
exports.updatePreferences = async (req, res) => {
  try {
    const prefs = {};
    if (typeof req.body.darkMode !== "undefined") prefs["preferences.darkMode"] = !!req.body.darkMode;
    if (typeof req.body.autoJoinWithVideo !== "undefined") prefs["preferences.autoJoinWithVideo"] = !!req.body.autoJoinWithVideo;
    if (typeof req.body.soundEffects !== "undefined") prefs["preferences.soundEffects"] = !!req.body.soundEffects;

    const user = await User.findByIdAndUpdate(req.user.id, { $set: prefs }, { new: true }).select("-password -otp -otpExpire -__v");
    res.json(user.preferences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// PUT /api/profile/notifications
// body: { email, push, sms }
exports.updateNotifications = async (req, res) => {
  try {
    const notifs = {};
    if (typeof req.body.email !== "undefined") notifs["notifications.email"] = !!req.body.email;
    if (typeof req.body.push !== "undefined") notifs["notifications.push"] = !!req.body.push;
    if (typeof req.body.sms !== "undefined") notifs["notifications.sms"] = !!req.body.sms;

    const user = await User.findByIdAndUpdate(req.user.id, { $set: notifs }, { new: true }).select("-password -otp -otpExpire -__v");
    res.json(user.notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// PUT /api/profile/change-password
// body: { currentPassword, newPassword }
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ error: "Missing fields" });

    const user = await User.findById(req.user.id).select("+password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
