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

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);