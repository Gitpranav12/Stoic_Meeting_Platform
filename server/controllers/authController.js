const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.registerUser = async(req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email exists" });

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ fullName, email, password: hashPassword });

        return res.json({ user, token: generateToken(user._id) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid credentials" });

        return res.json({ user, token: generateToken(user._id) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.googleLogin = async(req, res) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub, email, name } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                googleId: sub,
                fullName: name,
                email,
            });
        }

        return res.json({ user, token: generateToken(user._id) });
    } catch (error) {
        return res.status(400).json({ message: "Google Login Failed" });
    }
};

// Temporary OTP store (Better = Redis or DB)
let otpStore = {};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send OTP Controller
exports.sendOtp = async(req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email not registered" });

        const otp = Math.floor(100000 + Math.random() * 900000);
        otpStore[email] = otp;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Stoic Password Reset OTP",
            text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
        });

        return res.json({ message: "OTP sent to email" });
    } catch (error) {
        return res.status(500).json({ message: "Error sending OTP" });
    }
};

// Verify OTP Controller
exports.verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    if (!otpStore[email] || otpStore[email] != otp) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    return res.json({ message: "OTP verified successfully" });
};

// Reset Password Controller
exports.resetPassword = async(req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        if (!otpStore[email] || otpStore[email] != otp) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ email }, { password: hashedPassword });

        delete otpStore[email]; // remove OTP after reset

        return res.json({ message: "Password updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Reset password failed" });
    }
};