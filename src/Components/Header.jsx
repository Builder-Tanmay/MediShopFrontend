import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../CSS/Header.css';

const Header = () => {
  return (
    <>
    <header className="site-header ">
      <nav className="navbar-container ">
        
        {/* Brand Logo */}
        <div className="brand-logo">
          <Link to="/" className="logo-link">
            <span className="medi">Medi</span>
            <span className="shop">Shop</span>
          </Link>
        </div>

        {/* Center Navigation Links */}
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Services
            </NavLink>
          </li>
        </ul>

        {/* Right User Actions */}
        <div className="nav-actions">
          <Link to="/login" className="nav-link login-link">
            Login
          </Link>
          <Link to="/cart" className="nav-link cart-btn">
            Cart
          </Link>
        </div>

      </nav>
    </header>
    </>
  );
};

export default Header;