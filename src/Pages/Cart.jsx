import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Redirect unauthenticated users
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login first to view your cart!");
      navigate("/login");
      return;
    }

    const savedCart = JSON.parse(localStorage.getItem("medishop_cart")) || [];
    setCartItems(savedCart);
  }, [navigate]);

  const updateLocalStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("medishop_cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (itemId, currentQty, delta) => {
    const newQuantity = currentQty + delta;
    if (newQuantity <= 0) {
      return handleRemoveItem(itemId);
    }

    const updated = cartItems.map((item) =>
      item.id === itemId ? { ...item, Quantity: newQuantity } : item
    );
    updateLocalStorage(updated);
  };

  const handleRemoveItem = (itemId) => {
    const updated = cartItems.filter((item) => item.id !== itemId);
    updateLocalStorage(updated);
  };

  // Cost calculations using Java Entity Field Names (Price and Quantity)
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.Price || 0) * (item.Quantity || 1),
    0
  );
  const deliveryCharge = subtotal > 499 || subtotal === 0 ? 0 : 50;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="medishop-page-wrapper">
      <div className="medishop-container">
        
        {/* Cart Header */}
        <header className="cart-page-header">
          <span className="brand-badge">
            <span className="badge-dot"></span> Secure Checkout
          </span>
          <h1>Your <span className="text-teal">Shopping</span> Cart</h1>
          <p>Review your selected medicines & healthcare essentials</p>
        </header>

        {cartItems.length === 0 ? (
          <div className="cart-empty-box">
            <div className="empty-cart-illustration">🛒</div>
            <h2>Your cart is currently empty</h2>
            <p>Looks like you haven't added any medicines or health products yet.</p>
            <Link to="/products" className="btn-browse-products">
              Browse Medicines & Essentials
            </Link>
          </div>
        ) : (
          <div className="cart-grid-layout">
            
            {/* Cart Items List */}
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const itemId = item.id;
                const itemPrice = item.Price || 0;
                const itemQty = item.Quantity || 1;
                const itemName = item.MedicineName;

                return (
                  <div key={itemId} className="cart-item-card">
                    <img
                      src={item.Img || "https://via.placeholder.com/80?text=Medicine"}
                      alt={itemName}
                      className="item-thumb"
                    />

                    <div className="item-info">
                      <span className="item-cat">{item.ManufactureName || "Medicine"}</span>
                      <h4 className="item-name">{itemName}</h4>
                      <span className="item-unit-price">₹{itemPrice} / item</span>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="item-qty-stepper">
                      <button
                        className="stepper-btn"
                        onClick={() => handleQuantityChange(itemId, itemQty, -1)}
                      >
                        -
                      </button>
                      <span className="qty-val">{itemQty}</span>
                      <button
                        className="stepper-btn"
                        onClick={() => handleQuantityChange(itemId, itemQty, 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="item-subtotal">
                      ₹{itemPrice * itemQty}
                    </div>

                    <button
                      className="item-delete-btn"
                      onClick={() => handleRemoveItem(itemId)}
                      title="Remove item"
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right Summary Sidebar */}
            <div className="cart-summary-sidebar">
              <div className="summary-card">
                <h3>Order Summary</h3>

                <div className="summary-line">
                  <span>Subtotal</span>
                  <span className="val-bold">₹{subtotal}</span>
                </div>

                <div className="summary-line">
                  <span>Delivery Charge</span>
                  <span>
                    {deliveryCharge === 0 ? (
                      <span className="free-badge">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>

                {deliveryCharge > 0 && (
                  <div className="free-shipping-promo">
                    Add ₹{499 - subtotal} more to unlock <strong>FREE Delivery</strong>!
                  </div>
                )}

                <hr className="summary-divider" />

                <div className="summary-line total-line">
                  <span>Total Amount</span>
                  <span className="total-price">₹{grandTotal}</span>
                </div>

                <button
                  className="btn-checkout"
                  onClick={() => navigate("/order-summary")}
                >
                  Proceed to Checkout &rarr;
                </button>

                <div className="trust-badges">
                  <span>🔒 256-Bit Encrypted</span>
                  <span>⚡ Fast Delivery</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;