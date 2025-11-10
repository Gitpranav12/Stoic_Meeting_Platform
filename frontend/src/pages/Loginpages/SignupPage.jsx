import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // ✅ import navigation
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function SignupPage() {
  const navigate = useNavigate(); // ✅ Initialize router navigation
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);

 const handleSignup = (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // ✅ Save user data to localStorage
  const newUser = { fullName, email, password };
  localStorage.setItem("stoicUser", JSON.stringify(newUser));

  alert(`Account created successfully for ${fullName}!`);

  // ✅ Redirect to Login page after saving
  setTimeout(() => {
    navigate("/"); // goes to LoginPage
  }, 1000);
};


  const handleGoogleSuccess = (response) => {
    const userInfo = jwtDecode(response.credential);
    setUser(userInfo);
    alert(`Welcome ${userInfo.name}!`);
    setTimeout(() => {
      navigate("/"); // redirect after Google signup
    }, 1000);
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
        {/* ===== Left Gradient Section (Desktop Only) ===== */}
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

            <h2 className="fw-semibold mb-3">Join Stoic Meeting Platform</h2>
            <p className="lead fw-light mb-0">
              Start your journey to seamless collaboration and productivity.
            </p>
          </div>
        </div>

        {/* ===== Right Signup Form Section ===== */}
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
            {/* ===== Mobile Stoic Logo Section ===== */}
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

            {/* Signup Form Section */}
            
              <>
                <div className="text-start mb-4">
                  <h4 className="fw-bold mb-2">Create an account</h4>
                  <p className="text-muted small">
                    Enter your information to get started
                  </p>
                </div>

                <form onSubmit={handleSignup}>
                  <div className="mb-3 text-start">
                    <label className="form-label fw-semibold small text-dark">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control py-2"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      style={{ borderRadius: "8px" }}
                    />
                  </div>

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

                  <div className="mb-3 text-start">
                    <label className="form-label fw-semibold small text-dark">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control py-2"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ borderRadius: "8px" }}
                    />
                  </div>

                  <div className="mb-4 text-start">
                    <label className="form-label fw-semibold small text-dark">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control py-2"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      style={{ borderRadius: "8px" }}
                    />
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
                    Create Account
                  </button>
                </form>

                {/* Divider */}
                <div className="text-center my-3 position-relative">
                  <hr className="text-muted" />
                  <span
                    className="position-absolute top-50 start-50 translate-middle px-2 text-muted small bg-white"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Or continue with
                  </span>
                </div>

                {/* Google Signup */}
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

                {/* Footer */}
                <div className="text-center mt-2">
                  <small className="text-muted">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="fw-semibold btn btn-link p-0 text-decoration-none"
                      style={{ color: "#2563eb" }}
                      onClick={() => navigate("/")} // ✅ redirect to login
                    >
                      Login
                    </button>
                  </small>
                </div>
              </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
