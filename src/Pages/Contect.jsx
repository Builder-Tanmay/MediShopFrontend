import React from "react";
import "../CSS/Contact.css"; 

const Contact = () => {
  return (
    <div className="medishop-page-wrapper">
      <div className="medishop-container">
        <header className="summary-page-header">
          <span className="brand-badge">
            <span className="badge-dot"></span> Get In Touch
          </span>
          <h1>
            Contact <span className="text-teal">Medi</span>
            <span className="text-navy">Shop</span>
          </h1>
          <p>Have questions about your order or medicines? We are here to help!</p>
        </header>

        <div className="shipping-form-card" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="4" placeholder="How can we assist you?" required></textarea>
            </div>
            <button type="submit" className="btn-confirm-order">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;