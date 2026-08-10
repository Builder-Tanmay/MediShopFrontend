import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Info, 
  Layers, 
  BookOpen, 
  Briefcase, 
  Mail, 
  ShoppingCart, 
  LogOut 
} from 'lucide-react';
import '../Css/Header.css';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check if user exists in localStorage
  const checkAuth = () => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Converts object/null to boolean true/false
  };

  useEffect(() => {
    // 1. Check auth status on component mount
    checkAuth();

    // 2. Listen for custom 'auth-change' event (same tab) and 'storage' event (other tabs)
    window.addEventListener("auth-change", checkAuth);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session from DB
    setIsLoggedIn(false);
    
    // Notify application of auth change
    window.dispatchEvent(new CustomEvent("auth-change"));

    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <header className="fixed-top d-flex justify-content-center pt-4 px-3">
      <nav className="glass-navbar d-flex align-items-center justify-content-between rounded-pill">
        
        {/* Brand Logo */}
        <Link to="/" className="brand-logo d-flex align-items-center justify-content-center  text-decoration-none ">
            <h2 className="footer-brand-title">
              <span className="text-teal">Medi</span>
              <span className="text-dark">Shop</span>
            </h2>
        </Link>
        
        <div className="nav-divider"></div>

        {/* Navigation Icons Bar */}
        <div className="nav-icons-wrapper">
          <ul className="nav nav-icon-list align-items-center list-unstyled mb-0">
            
            <li className="nav-item">
              <NavLink 
                to="/" 
                end 
                data-tooltip="Home"
                className={({ isActive }) => `nav-icon-btn d-flex align-items-center justify-content-center ${isActive ? 'active-icon' : ''}`}
              >
                <Home size={22} strokeWidth={1.8} />
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/about" 
                data-tooltip="About"
                className={({ isActive }) => `nav-icon-btn d-flex align-items-center justify-content-center ${isActive ? 'active-icon' : ''}`}
              >
                <Info size={22} strokeWidth={1.8} />
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/services" 
                data-tooltip="Services"
                className={({ isActive }) => `nav-icon-btn d-flex align-items-center justify-content-center ${isActive ? 'active-icon' : ''}`}
              >
                <Layers size={22} strokeWidth={1.8} />
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/cart" 
                data-tooltip="Blogs"
                className={({ isActive }) => `nav-icon-btn d-flex align-items-center justify-content-center ${isActive ? 'active-icon' : ''}`}
              >
                <BookOpen size={22} strokeWidth={1.8} />
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/products" 
                data-tooltip="Products"
                className={({ isActive }) => `nav-icon-btn d-flex align-items-center justify-content-center ${isActive ? 'active-icon' : ''}`}
              >
                <Briefcase size={22} strokeWidth={1.8} />
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/contact" 
                data-tooltip="Contact Us"
                className={({ isActive }) => `nav-icon-btn d-flex align-items-center justify-content-center ${isActive ? 'active-icon' : ''}`}
              >
                <Mail size={22} strokeWidth={1.8} />
              </NavLink>
            </li>

            {/* Cart Icon (Renders ONLY when user is logged in) */}
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink 
                  to="/cart" 
                  data-tooltip="Cart"
                  className={({ isActive }) => `nav-icon-btn d-flex align-items-center justify-content-center ${isActive ? 'active-icon' : ''}`}
                >
                  <ShoppingCart size={22} strokeWidth={1.8} />
                </NavLink>
              </li>
            )}

          </ul>
        </div>

        <div className="nav-divider"></div>

        {/* Auth Buttons */}
        <div className="d-flex align-items-center nav-actions flex-shrink-0">
          {!isLoggedIn ? (
            <>
              {/* Show Login & Sign Up when NOT logged in */}
              <Link 
                to="/login" 
                className="btn-login-link text-decoration-none fw-medium"
              >
                Login
              </Link>
              
              <Link 
                to="/register" 
                className="btn-signup-pill text-decoration-none fw-semibold"
              >
                Sign up
              </Link>
            </>
          ) : (
            /* Show Logout when logged in */
            <button 
              type="button"
              onClick={handleLogout} 
              className="btn-logout-pill fw-medium d-flex align-items-center gap-2"
            >
              <LogOut size={16} />
              <span className="d-none d-sm-inline">Logout</span>
            </button>
          )}
        </div>

      </nav>
    </header>
  );
}

export default Header;