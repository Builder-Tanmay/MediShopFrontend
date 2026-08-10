import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added missing import
import "../CSS/ForgotPassword.css";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate(); // Initialized navigate hook

  // Step tracker: 1 = Email, 2 = OTP, 3 = New Password
  const [step, setStep] = useState(1);

  // Form values
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Loading indicator state
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP Handler (Added async)
  const handleSendOtp = async () => {
    if (!email) return alert("Please enter your email!");
    setLoading(true);
    try {
      // Endpoint matched with Spring Boot @PostMapping("/send-otp")
      await axios.post(`http://localhost:8080/user/send-otp?email=${encodeURIComponent(email)}`);
      alert("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      console.error("Send OTP Error:", err);
      alert(err.response?.data || "Failed to send OTP. Please check your email address.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Validate OTP Handler (Added async)
  const handleValidateOtp = async () => {
    if (!otp) return alert("Please enter the OTP!");
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/user/validate-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`
      );
      alert("OTP Validated!");
      setStep(3);
    } catch (err) {
      console.error("Validate OTP Error:", err);
      alert(err.response?.data || "Invalid OTP! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password Handler
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return alert("Please fill both password fields!");
    }
    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/user/reset-password?email=${encodeURIComponent(email)}&newPassword=${encodeURIComponent(newPassword)}`
      );
      alert("Password reset successfully! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      console.error("Reset Password Error:", err);
      alert(err.response?.data || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-lg-5 col-md-7 col-sm-10">
            <div className="forgot-card">
              <h2 className="logo">
                <span className="medi">Medi</span>
                <span className="shop">Shop</span>
              </h2>

              <h3>Forgot Password</h3>
              <p className="subtitle">Reset your account password securely.</p>

              <form onSubmit={(e) => e.preventDefault()}>
                
                {/* STEP 1: EMAIL SECTION */}
                {step === 1 && (
                  <div className="form-section">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />

                    <button
                      type="button"
                      className="btn btn-primary w-100 mt-3"
                      onClick={handleSendOtp}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </button>
                  </div>
                )}

                {/* STEP 2: OTP SECTION */}
                {step === 2 && (
                  <div className="form-section">
                    <label>OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={loading}
                    />

                    <div className="d-flex justify-content-between mt-3">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleSendOtp}
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Resend OTP"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleValidateOtp}
                        disabled={loading}
                      >
                        {loading ? "Validating..." : "Validate OTP"}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: NEW PASSWORD SECTION */}
                {step === 3 && (
                  <div className="form-section">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={loading}
                    />

                    <label className="mt-3">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />

                    <button
                      type="button"
                      className="btn btn-danger w-100 mt-4"
                      onClick={handleResetPassword}
                      disabled={loading}
                    >
                      {loading ? "Resetting..." : "Reset Password"}
                    </button>
                  </div>
                )}

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;