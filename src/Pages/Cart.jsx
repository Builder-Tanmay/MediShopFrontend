import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  /* ============================================================
   * BACKEND INTEGRATION LOGIC (UNCOMMENT WHEN API IS READY)
   * ============================================================
   * 
   * const [loading, setLoading] = useState(true);
   * const [error, setError] = useState(null);
   * 
   * useEffect(() => {
   *   const fetchCartFromBackend = async () => {
   *     try {
   *       setLoading(true);
   *       const response = await fetch('/api/cart');
   *       if (!response.ok) throw new Error('Failed to load cart');
   *       const data = await response.json();
   *       setCartItems(data.items || []);
   *     } catch (err) {
   *       setError(err.message);
   *     } finally {
   *       setLoading(false);
   *     }
   *   };
   *   fetchCartFromBackend();
   * }, []);
   * 
   * const handleQuantityChange = async (itemId, currentQty, delta) => {
   *   const newQuantity = currentQty + delta;
   *   if (newQuantity <= 0) return handleRemoveItem(itemId);
   * 
   *   try {
   *     const response = await fetch(`/api/cart/update/${itemId}`, {
   *       method: 'PUT',
   *       headers: { 'Content-Type': 'application/json' },
   *       body: JSON.stringify({ quantity: newQuantity })
   *     });
   *     const data = await response.json();
   *     setCartItems(data.items);
   *   } catch (err) {
   *     console.error(err);
   *   }
   * };
   * 
   * const handleRemoveItem = async (itemId) => {
   *   try {
   *     const response = await fetch(`/api/cart/remove/${itemId}`, { method: 'DELETE' });
   *     const data = await response.json();
   *     setCartItems(data.items);
   *   } catch (err) {
   *     console.error(err);
   *   }
   * };
   * 
   * const handleCheckout = async () => {
   *   try {
   *     await fetch('/api/checkout', {
   *       method: 'POST',
   *       headers: { 'Content-Type': 'application/json' },
   *       body: JSON.stringify({ items: cartItems, totalAmount: grandTotal })
   *     });
   *     alert('Order placed successfully!');
   *   } catch (err) {
   *     console.error(err);
   *   }
   * };
   * ============================================================ */

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
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
            
            {/* Cart Items Column */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item._id || item.id} className="cart-item-card">
                  <img
                    src={item.image || "https://via.placeholder.com/80?text=Medicine"}
                    alt={item.name}
                    className="item-thumb"
                  />

                  <div className="item-info">
                    <span className="item-cat">{item.category}</span>
                    <h4 className="item-name">{item.name}</h4>
                    <span className="item-unit-price">₹{item.price} / item</span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="item-qty-stepper">
                    <button
                      className="stepper-btn"
                      onClick={() => {/* handleQuantityChange(item.id, item.quantity, -1) */}}
                    >
                      -
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button
                      className="stepper-btn"
                      onClick={() => {/* handleQuantityChange(item.id, item.quantity, 1) */}}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-subtotal">
                    ₹{item.price * item.quantity}
                  </div>

                  <button
                    className="item-delete-btn"
                    onClick={() => {/* handleRemoveItem(item.id) */}}
                    title="Remove item"
                  >
                    &times;
                  </button>
                </div>
              ))}
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
                  onClick={() => {/* handleCheckout() */}}
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