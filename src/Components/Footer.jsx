import React from 'react'
import { Link } from 'react-router-dom';
import '../CSS/Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* Logo & Description */}
          <div className="col-md-4 mb-4">
            <h3 className="fw-bold">
              <span style={{ color: "#0d6efd" }}>Medi</span>
              <span style={{ color: "#dc3545" }}>Shop</span>
            </h3>

            <p className="mt-3">
              Your trusted online pharmacy for medicines, healthcare
              products, and wellness essentials delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5>Quick Links</h5>

            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/products" className="footer-link">Products</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="col-md-3 mb-4">
            <h5>Customer Support</h5>

            <ul className="list-unstyled">
              <li><Link to="/faq" className="footer-link">FAQs</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
              <li><Link to="/returns" className="footer-link">Return Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h5>Contact Us</h5>

            <p>📍 Mumbai, Maharashtra</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@medishop.com</p>
          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center">
          <p className="mb-0">
            © 2026 <strong>MediShop</strong>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}



export default Footer