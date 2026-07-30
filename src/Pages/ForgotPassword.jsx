import React, { useState } from "react";
import "../CSS/ForgotPassword.css";

const ForgotPassword = () => {
  // Step tracker: 1 = Email, 2 = OTP, 3 = New Password
  const [step, setStep] = useState(1);

  // Form values store karne ke liye states
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handlers
  const handleSendOtp = () => {
    if (!email) return alert("Please enter your email!");
    // API call logic yahan aayega
    setStep(2); // Step 2 par switch karein
  };

  const handleValidateOtp = () => {
    if (!otp) return alert("Please enter the OTP!");
    // API call logic yahan aayega
    setStep(3); // Step 3 par switch karein
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      return alert("Please fill both password fields!");
    }
    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match!");
    }
    // Final submit logic yahan aayega
    alert("Password reset successfully!");
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
                    />

                    <button
                      type="button"
                      className="btn btn-primary w-100 mt-3"
                      onClick={handleSendOtp}
                    >
                      Send OTP
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
                    />

                    <div className="d-flex justify-content-between mt-3">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleSendOtp}
                      >
                        Resend OTP
                      </button>

                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleValidateOtp}
                      >
                        Validate OTP
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
                    />

                    <label className="mt-3">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className="btn btn-danger w-100 mt-4"
                      onClick={handleResetPassword}
                    >
                      Reset Password
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