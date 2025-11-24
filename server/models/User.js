const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, trim: true },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        select: false,
    },

    googleId: { type: String },

    profilePhoto: {
        type: String,
        default: "https://i.ibb.co/2Wz2k72/default-avatar.png",
    },

    otp: { type: String }, // 🔐 OTP store
    otpExpire: { type: Date }, // ⏳ OTP time limit

    // New: user preferences
    preferences: {
        darkMode: { type: Boolean, default: false },
        autoJoinWithVideo: { type: Boolean, default: true },
        soundEffects: { type: Boolean, default: true },
    },

    // New: notifications
    notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
    },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);