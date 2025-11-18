import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/auth";

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");

    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Failed to send OTP");

      setMessage("OTP sent successfully!");
      setStep(2);
    } catch {
      setError("Server error! Check backend connection.");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");

    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Invalid OTP!");

      setMessage("OTP verified! Set new password");
      setStep(3);
    } catch {
      setError("Server error during OTP verification");
    }
  };

  // Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");

    if (newPassword !== confirmPassword)
      return setError("Passwords do not match!");

    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Failed to reset!");

      setMessage("Password updated! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      setError("Server error during password reset");
    }
  };

  return (
    <div className="container-fluid p-0" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #6f42c1, #E91E63)" }}>
      
      <div className="row g-0 min-vh-100">
        
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center text-center text-white">
          <div className="px-5">
            <h3 className="fw-bold mb-0 text-white">Stoic</h3>
            <p className="text-white-50 small mb-4">Meeting Platform</p>
            <h2 className="fw-semibold mb-3">Forgot your password?</h2>
            <p className="lead fw-light">We’ll help you recover access.</p>
          </div>
        </div>

        {/* Right card */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center py-5">
          <div className="card shadow-sm px-4 py-4 w-100"
            style={{ maxWidth: "410px", borderRadius: "16px" }}>

            <h4 className="fw-bold text-center mb-3 text-dark">
              {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
            </h4>

            {message && <p className="text-success text-center small">{message}</p>}
            {error && <p className="text-danger text-center small">{error}</p>}

            {/* STEP 1 */}
            {step === 1 && (
              <form onSubmit={handleSendOtp}>
                <input className="form-control mb-3"
                  type="email" placeholder="Enter your email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  required />
                <button className="btn btn-dark w-100">Send OTP</button>
              </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp}>
                <input className="form-control mb-3"
                  type="text" maxLength="6"
                  placeholder="Enter OTP"
                  value={otp} onChange={(e) => setOtp(e.target.value)}
                  required />
                <button className="btn btn-dark w-100 mb-2">Verify OTP</button>
                <p className="text-primary small text-center"
                  style={{ cursor: "pointer" }}
                  onClick={handleSendOtp}>Resend OTP</p>
              </form>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <input className="form-control mb-3"
                  type="password" placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required />
                <input className="form-control mb-3"
                  type="password" placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required />
                <button className="btn btn-dark w-100">Reset Password</button>
              </form>
            )}

            <div className="text-center mt-3 small">
              Remember Password?{" "}
              <Link to="/" className="fw-semibold" style={{color:"#2563eb"}}>
                Login
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
