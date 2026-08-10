import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Footer.css';

const Footer = () => {
  return (
    <footer className="medishop-footer-section">
      <div className="container position-relative z-2">
        <div className="row justify-content-between align-items-start">
          
          {/* Logo & Description */}
          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
            <h2 className="footer-brand-title">
              <span className="text-teal">Medi</span>
              <span className="text-dark">Shop</span>
            </h2>
            <p className="footer-brand-desc">
              Your trusted online pharmacy for medicines, healthcare products, 
              and wellness essentials—delivered with speed, safety, and care directly to your doorstep.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-lg-2 col-md-3 mb-4 mb-lg-0 ms-lg-auto">
            <h6 className="footer-heading">EXPLORE</h6>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/medicines">Medicines</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Cards */}
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading">GET IN TOUCH</h6>
            <div className="contact-cards-container">
              
              {/* Phone Card */}
              <a href="tel:+919876543210" className="footer-contact-card">
                <div className="contact-icon-box">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="contact-info">
                  <span className="contact-label">Call us</span>
                  <span className="contact-value">+91 98765 43210</span>
                </div>
              </a>

              {/* Email Card */}
              <a href="mailto:support@medishop.com" className="footer-contact-card">
                <div className="contact-icon-box">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="contact-info">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">support@medishop.com</span>
                </div>
              </a>

            </div>
          </div>

        </div>

        {/* Floating Social Icons Bar */}
        <div className="footer-social-wrapper">
          <a href="#" className="social-pill" data-tooltip="Appointments">
            <i className="fa-regular fa-calendar-check"></i>
          </a>
          <a href="tel:+919876543210" className="social-pill" data-tooltip="Call Support">
            <i className="fa-solid fa-phone"></i>
          </a>
          <a href="#" className="social-pill" data-tooltip="Twitter / X">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href="#" className="social-pill" data-tooltip="LinkedIn">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="#" className="social-pill" data-tooltip="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="mailto:support@medishop.com" className="social-pill" data-tooltip="Email Us">
            <i className="fa-regular fa-envelope"></i>
          </a>
        </div>

        {/* Center Logo Emblem */}
        <div className="footer-emblem-box">
          <div className="emblem-inner">
            <i className="fa-solid fa-briefcase-medical"></i>
            <span className="emblem-text">MEDISHOP</span>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom-bar">
          <p className="mb-0">
            © {new Date().getFullYear()} MediShop. All rights reserved.
          </p>
        </div>
      </div>

      {/* Massive Background Watermark  */}
       <div className="footer-bg-watermark" aria-hidden="true">
        MEDISHOP
      </div>
    </footer>
  );
};

export default Footer;