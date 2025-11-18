const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register
exports.registerUser = async(req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        res.json({ user, token: generateToken(user._id) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
exports.loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid email or password" });

        res.json({ user, token: generateToken(user._id) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Google Login
exports.googleLogin = async(req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400).json({ message: "Token missing" });

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, picture, sub } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                fullName: name,
                email,
                profilePhoto: picture,
                googleId: sub,
            });
        }

        res.json({
            message: "Google Login Success",
            token: generateToken(user._id),
            user,
        });
    } catch (err) {
        res.status(401).json({ message: "Invalid Google Token" });
    }
};

// Nodemailer Config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Send OTP — stored in DB
exports.sendOtp = async(req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email not registered" });

        const otp = Math.floor(100000 + Math.random() * 900000);

        user.otp = otp;
        user.otpExpire = Date.now() + 5 * 60 * 1000;
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Stoic Password Reset OTP",
            text: `Your OTP is ${otp} (Valid for 5 mins).`,
        });

        res.json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send OTP" });
    }
};

// Verify OTP (DB check)
exports.verifyOtp = async(req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email, otp });
    if (!user || user.otpExpire < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully" });
};

// Reset Password + Clear OTP
exports.resetPassword = async(req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email, otp });
        if (!user || user.otpExpire < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpire = null;
        await user.save();

        res.json({
            message: "Password updated successfully",
            token: generateToken(user._id),
            user,
        });
    } catch (error) {
        res.status(500).json({ message: "Password reset failed" });
    }
};