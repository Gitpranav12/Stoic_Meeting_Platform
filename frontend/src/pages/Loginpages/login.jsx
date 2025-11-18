import React, { useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      navigate("/dashboard");
    }
  }, [navigate]);

const API_URL = "http://localhost:5000/api/auth";

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("loggedInUser", JSON.stringify(data.user));

    navigate("/dashboard");
  } catch (error) {
    alert("Server error, try again!");
  }
};


const handleGoogleSuccess = async (credentialResponse) => {
  const token = credentialResponse?.credential;

  if (!token) {
    alert("Google token missing!");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Google Login Error");
      return;
    }

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("loggedInUser", JSON.stringify(data.user));

    navigate("/dashboard");
  } catch (error) {
    alert("Server error!");
  }
};


  const handleGoogleError = () => alert("Google Sign-In Failed");

  return (
    <div
      className="container-fluid p-0"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6f42c1, #E91E63)",
      }}
    >
      <div className="row g-0 min-vh-100">
        {/* ===== Left Side ===== */}
        <div
          className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center text-center text-white"
          style={{
            background: "linear-gradient(135deg, #6f42c1, #E91E63)",
          }}
        >
          <div className="px-5">
            <div className="d-flex align-items-center justify-content-center mb-4">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                }}
              >
                <i
                  className="bi bi-camera-video-fill text-white"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </div>
              <div className="text-start">
                <h3 className="fw-bold mb-0 text-white">Stoic</h3>
                <p className="text-white-50 mb-0 small">Meeting Platform</p>
              </div>
            </div>

            <h2 className="fw-semibold mb-3">
              Welcome to Stoic Meeting Platform
            </h2>
            <p className="lead fw-light mb-0">
              Connect, collaborate, and communicate seamlessly with your team.
            </p>
          </div>
        </div>

        {/* ===== Right Form Section ===== */}
        <div
          className="col-12 col-lg-6 d-flex align-items-center justify-content-center bg-light bg-lg-white py-5"
          style={{
            backgroundColor: "transparent",
            padding: "2rem",
          }}
        >
          <div
            className="card shadow-sm border-0 px-4 py-4 w-100"
            style={{
              maxWidth: "410px",
              borderRadius: "16px",
              backgroundColor: "white",
            }}
          >
            {/* Mobile Logo */}
            <div className="d-lg-none text-center mb-4">
              <div
                className="d-flex align-items-center justify-content-center mb-2"
                style={{ gap: "10px" }}
              >
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "10px",
                    backgroundColor: "#a855f7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="bi bi-camera-video-fill text-white"
                    style={{ fontSize: "1.3rem" }}
                  ></i>
                </div>
                <div className="text-start text-dark">
                  <h4 className="fw-bold mb-0">Stoic</h4>
                  <p className="text-muted small mb-0">Meeting Platform</p>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="text-start mb-4">
              <h4 className="fw-bold mb-2">Login to your account</h4>
              <p className="text-muted small">
                Enter your email and password to access your dashboard
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-3 text-start">
                <label className="form-label fw-semibold small text-dark">
                  Email
                </label>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control py-2"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      borderTopLeftRadius: "8px",
                      borderBottomLeftRadius: "8px",
                    }}
                  />
                  <span
                    className="input-group-text bg-white"
                    style={{
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                    }}
                  >
                    <i className="bi bi-envelope text-success"></i>
                  </span>
                </div>
              </div>

              <div className="mb-2 text-start">
                <label className="form-label fw-semibold small text-dark">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control py-2"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      borderTopLeftRadius: "8px",
                      borderBottomLeftRadius: "8px",
                    }}
                  />
                  <span
                    className="input-group-text bg-white"
                    style={{
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                    }}
                  >
                    <i className="bi bi-lock text-secondary"></i>
                  </span>
                </div>
              </div>

              <div className="text-end mb-3">
                  <Link
                  to="/forgot"
                  className="fw-semibold text-decoration-none"
                  style={{ color: "#2563eb" }}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn w-100 fw-bold text-white py-2 mb-3"
                style={{
                  backgroundColor: "#0b0b18",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                Login
              </button>
            </form>

            <div className="text-center my-3 position-relative">
              <hr className="text-muted" />
              <span
                className="position-absolute top-50 start-50 translate-middle px-2 text-muted small bg-white"
                style={{ fontSize: "0.8rem" }}
              >
                Or continue with
              </span>
            </div>

            <div className="d-flex justify-content-center mb-3">
              <div
                className="btn w-100 d-flex align-items-center justify-content-center fw-semibold text-dark bg-white border"
                style={{
                  borderColor: "#e5e7eb",
                  borderRadius: "8px",
                  height: "42px",
                }}
              >
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap={false}
                />
              </div>
            </div>

            <div className="text-center mt-2">
              <small className="text-muted">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="fw-semibold text-decoration-none"
                  style={{ color: "#2563eb" }}
                >
                  Create Account
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
