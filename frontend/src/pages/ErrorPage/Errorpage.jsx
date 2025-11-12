import React from "react";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-4"
      style={{
        background: "linear-gradient(135deg, #eff6ff, #ffffff, #e0f2fe)",
      }}
    >
      <div
        className="card text-center shadow border rounded-4"
        style={{
          maxWidth: "460px",
          width: "100%",
          padding: "24px 20px",
          borderColor: "#d1d5db",
        }}
      >
        {/* Error Icon */}
        <div className="d-flex justify-content-center mb-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "72px",
              height: "72px",
              backgroundColor: "#fee2e2",
            }}
          >
            <AlertCircle size={36} color="#dc2626" />
          </div>
        </div>

        {/* Error Message */}
        <h5 className="text-dark fw-semibold mb-2">Meeting Not Found</h5>
        <p className="text-secondary mb-4" style={{ fontSize: "0.9rem" }}>
          The meeting you're trying to join doesn't exist or has already ended.
          Please check the meeting link and try again.
        </p>

        {/* Illustration */}
        <div
          className="border rounded-3 shadow-sm p-3 mb-4"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#e5e7eb",
          }}
        >
          <div className="mx-auto" style={{ width: "85%" }}>
            <div
              className="rounded mb-2 mx-auto"
              style={{
                height: "8px",
                backgroundColor: "#e5e7eb",
                width: "70%",
              }}
            />
            <div
              className="rounded mb-2 mx-auto"
              style={{
                height: "8px",
                backgroundColor: "#e5e7eb",
                width: "45%",
              }}
            />
            <div
              className="rounded-3 d-flex align-items-center justify-content-center mt-2"
              style={{
                height: "40px",
                backgroundColor: "#f3f4f6",
                width: "100%",
              }}
            >
              <AlertCircle size={20} color="#9ca3af" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-grid gap-2">
          <button
            className="btn text-white fw-semibold py-2"
            style={{
              backgroundColor: "#0066FF",
              borderRadius: "10px",
              fontSize: "0.9rem",
            }}
            onClick={() => navigate("/dashboard")} // ✅ Go to Dashboard
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0052CC")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0066FF")}
          >
            <Home size={16} className="me-2" />
            Back to Dashboard
          </button>

          <button
            className="btn btn-outline-secondary fw-semibold py-2"
            style={{
              borderRadius: "10px",
              fontSize: "0.9rem",
              borderColor: "#cbd5e1",
            }}
            onClick={() => navigate(-1)} // ✅ Go back
          >
            <ArrowLeft size={16} className="me-2" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <p
          className="text-muted mt-4 mb-0"
          style={{ fontSize: "0.8rem", lineHeight: "1.3" }}
        >
          Need help? Contact support at{" "}
          <a
            href="mailto:support@stoicmeet.com"
            className="fw-semibold text-decoration-none"
            style={{ color: "#0066FF" }}
          >
            support@stoicmeet.com
          </a>
        </p>
      </div>
    </div>
  );
}
