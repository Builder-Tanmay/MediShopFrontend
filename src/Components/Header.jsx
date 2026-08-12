import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Info, 
  Layers, 
  Briefcase, 
  Mail, 
  ShoppingCart, 
  LogOut,
  Heart,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import '../Css/Header.css';

// Helper function to dispatch custom event and trigger immediate Navbar refresh
export const notifyAuthChange = () => {
  window.dispatchEvent(new CustomEvent("auth-change"));
};

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Helper function to extract ONLY the user's name string from localStorage
  const extractUserName = (userData) => {
    if (!userData) return "";

    try {
      // 1. Try parsing JSON object
      const parsed = typeof userData === "string" ? JSON.parse(userData) : userData;

      if (typeof parsed === "object" && parsed !== null) {
        // Check both nested 'user' object and root object fields
        const userObj = parsed.user || parsed;

        const extracted = 
          userObj.fullName || 
          userObj.name || 
          userObj.userName || 
          userObj.username || 
          userObj.firstName || 
          userObj.MedicineName || 
          (userObj.email ? userObj.email.split('@')[0] : null);

        if (extracted && typeof extracted === "string" && extracted.trim() !== "") {
          return extracted.trim();
        }
      } else if (typeof parsed === "string" && !parsed.trim().startsWith("{")) {
        return parsed.trim();
      }
    } catch (e) {
      // 2. Fallback for raw non-JSON string
      if (typeof userData === "string" && !userData.trim().startsWith("{")) {
        return userData.trim();
      }
    }

    return "User"; // Safe fallback instead of printing raw JSON
  };

  // Check user authentication & session state
  const checkAuth = () => {
    const rawUserData = localStorage.getItem("user");

    if (rawUserData && rawUserData !== "undefined" && rawUserData !== "null") {
      const extractedName = extractUserName(rawUserData);
      setCurrentUser(extractedName || "User");
      setIsLoggedIn(true);
    } else {
      setCurrentUser("");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    // 1. Initial check on component mount
    checkAuth();

    // 2. Listen for custom 'auth-change' event (same tab) and 'storage' event (multi-tab)
    window.addEventListener("auth-change", checkAuth);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("medishop_cart");
    setIsLoggedIn(false);
    setCurrentUser("");
    setIsDropdownOpen(false);
    
    // Notify application to update navbar immediately
    notifyAuthChange();

    alert("Logged out successfully!");
    navigate("/login");
  };

  // Get initial character for Avatar
  const getUserInitial = () => {
    if (!currentUser || currentUser.trim() === "") return "U";
    return currentUser.charAt(0).toUpperCase();
  };

  return (
    <header className="fixed-top d-flex justify-content-center pt-4 px-3">
      <nav className="glass-navbar d-flex align-items-center justify-content-between rounded-pill">
        
        {/* Brand Logo */}
        <Link to="/" className="brand-logo d-flex align-items-center justify-content-center text-decoration-none">
          <h2 className="footer-brand-title m-0">
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

            {/* Cart Icon - ONLY renders when user is logged in */}
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

        {/* Auth Buttons or User Profile Avatar Dropdown */}
        <div className="d-flex align-items-center nav-actions flex-shrink-0">
          {!isLoggedIn ? (
            <>
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
            /* User Avatar + Dropdown Menu */
            <div className="user-profile-dropdown-container" ref={dropdownRef}>
              <button 
                type="button" 
                className="avatar-btn d-flex align-items-center justify-content-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                title={currentUser}
              >
                {getUserInitial()}
              </button>

              {isDropdownOpen && (
                <div className="user-dropdown-menu">
                  <div className="dropdown-user-header">
                    <span className="user-welcome">Hello,</span>
                    <strong className="user-display-name">{currentUser}</strong>
                  </div>
                  <hr className="dropdown-divider" />
                  
                  <Link 
                    to="/userdashboard" 
                    className="dropdown-item-link"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    <span>User Dashboard</span>
                  </Link>

                  <Link 
                    to="/wishlist" 
                    className="dropdown-item-link"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </Link>

                  <Link 
                    to="/userdashboard" 
                    className="dropdown-item-link"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings size={18} />
                    <span>Account Settings</span>
                  </Link>

                  <hr className="dropdown-divider" />

                  <button 
                    type="button" 
                    onClick={handleLogout} 
                    className="dropdown-logout-btn"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </nav>
    </header>
  );
}

export default Header;