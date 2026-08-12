import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/OrderSummery.css";

// Helper function: Dynamically load Razorpay SDK in the browser
const loadRazorpaySDK = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const OrderSummary = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "online",
  });

  // 1. Get logged-in user & pre-fill editable details
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = storedUser?.user || storedUser;
  const userId = currentUser?.id || currentUser?.userid || currentUser?.user_id;

  useEffect(() => {
    // Redirect if unauthenticated
    const rawUserData = localStorage.getItem("user");
    if (!rawUserData) {
      alert("Please login first to access checkout!");
      navigate("/login");
      return;
    }

    // Pre-fill user contact info from session
    if (currentUser) {
      setShippingDetails((prev) => ({
        ...prev,
        fullName:
          currentUser.fullName ||
          currentUser.name ||
          currentUser.username ||
          "",
        email: currentUser.email || "",
        phone: currentUser.phone || currentUser.contact || currentUser.mobile || "",
      }));
    }

    // Pre-load Razorpay SDK script
    loadRazorpaySDK();
  }, [navigate]);

  // 2. Fetch cart items from Spring Boot backend
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/cart/cartitem/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cart items.");
        }
        return response.json();
      })
      .then((data) => {
        setCartItems(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setError("Could not load cart items. Please check if your Spring Boot backend is running.");
        setLoading(false);
      });
  }, [userId]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Calculate Totals based on backend fields
  const subtotal = cartItems.reduce((acc, item) => {
    const med = item.medicine || {};
    const price = med.prices || med.Price || item.Price || 0;
    const qty = item.qunatity || item.quantity || item.Quantity || 1;
    return acc + price * qty;
  }, 0);

  const deliveryCharge = subtotal > 499 || subtotal === 0 ? 0 : 50;
  const grandTotal = subtotal + deliveryCharge;

  // 4. Safe Razorpay Payment Handler (Prevents Unexpected End of JSON Input)
  const handleRazorpayPayment = async () => {
    const isSDKLoaded = await loadRazorpaySDK();

    if (!isSDKLoaded || !window.Razorpay) {
      alert("Razorpay SDK failed to load. Please disable ad-blockers and try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const roundedAmount = Math.round(grandTotal);

      // Call Spring Boot Transaction Endpoint: /pay/gettransaction/{amount}
      const response = await fetch(`http://localhost:8080/pay/gettransaction/${roundedAmount}`);

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}. Transaction could not be created.`);
      }

      // Read response text first to safely prevent JSON parse error on empty response
      const textData = await response.text();
      if (!textData || textData.trim() === "") {
        throw new Error("Backend returned empty response. Check if PaymentService returns a valid transaction object.");
      }

      const data = JSON.parse(textData);
      console.log("Razorpay Order Data from Backend:", data);

      // Construct Razorpay options using flexible key fallbacks
      const options = {
        key: data.key || data.razorpayKey || "rzp_test_YOUR_KEY_HERE",
        amount: data.amount || data.totalAmount || roundedAmount * 100,
        currency: data.currency || "INR",
        name: "MediShop",
        description: "Medicine Order Payment",
        order_id: data.orderId || data.razorpayOrderId || data.id,
        prefill: {
          name: shippingDetails.fullName,
          email: shippingDetails.email,
          contact: shippingDetails.phone,
        },
        notes: {
          address: `${shippingDetails.address}, ${shippingDetails.city} - ${shippingDetails.postalCode}`,
        },
        theme: { color: "#00bba7" }, // MediShop Teal
        handler: function (paymentResponse) {
          console.log("Payment Successful:", paymentResponse);
          localStorage.removeItem("medishop_cart");
          alert(
            `🎉 Payment Successful!\nPayment ID: ${paymentResponse.razorpay_payment_id}\nYour order has been placed successfully.`
          );
          setIsSubmitting(false);
          navigate("/");
        },
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed by user");
            setIsSubmitting(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      alert(`Payment failed: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  // 5. Submit Form Handler
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!shippingDetails.fullName || !shippingDetails.address || !shippingDetails.phone) {
      alert("Please fill in all required delivery fields.");
      return;
    }

    setIsSubmitting(true);

    if (shippingDetails.paymentMethod === "cod") {
      setTimeout(() => {
        localStorage.removeItem("medishop_cart");
        alert("🎉 Order placed successfully with Cash on Delivery!");
        setIsSubmitting(false);
        navigate("/");
      }, 800);
    } else {
      handleRazorpayPayment();
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="medishop-page-wrapper">
        <div className="medishop-container">
          <div className="summary-empty-box">
            <div className="status-spinner"></div>
            <h2>Loading your order details...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="medishop-page-wrapper">
        <div className="medishop-container">
          <div className="summary-empty-box">
            <div className="empty-icon">⚠️</div>
            <h2>Unable to load order summary</h2>
            <p>{error}</p>
            <button className="btn-browse" onClick={() => navigate("/cart")}>
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="medishop-page-wrapper">
      <div className="medishop-container">
        
        {/* Header Section */}
        <header className="summary-page-header">
          <span className="brand-badge">
            <span className="badge-dot"></span> Secure Checkout
          </span>
          <h1>
            Order <span className="text-teal">Summary</span> & <span className="text-navy">Checkout</span>
          </h1>
          <p>Verify recipient details and delivery address to confirm your order.</p>
        </header>

        {cartItems.length === 0 ? (
          <div className="summary-empty-box">
            <div className="empty-icon">📦</div>
            <h2>No Items Selected for Checkout</h2>
            <p>Your cart is empty. Please add medicines before proceeding to checkout.</p>
            <Link to="/products" className="btn-browse">
              Browse Medicines & Essentials
            </Link>
          </div>
        ) : (
          <div className="summary-grid-layout">
            
            {/* Left Column: Delivery Details & Payment Form */}
            <div className="shipping-form-card">
              <h3>Recipient & Delivery Details</h3>
              <form onSubmit={handlePlaceOrder}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Recipient Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Full Name"
                      value={shippingDetails.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      value={shippingDetails.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. recipient@example.com"
                    value={shippingDetails.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Delivery Address *</label>
                  <textarea
                    name="address"
                    rows="3"
                    placeholder="House/Flat No., Building, Street Name, Landmark"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Mumbai"
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="e.g. 400001"
                      value={shippingDetails.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <h3 className="section-subtitle">Payment Method</h3>
                <div className="payment-options">
                  <label
                    className={`payment-option ${
                      shippingDetails.paymentMethod === "online" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={shippingDetails.paymentMethod === "online"}
                      onChange={handleInputChange}
                    />
                    <div>
                      <strong>Razorpay (UPI / Cards / NetBanking)</strong>
                      <p>Pay securely via Razorpay checkout gateway.</p>
                    </div>
                  </label>

                  <label
                    className={`payment-option ${
                      shippingDetails.paymentMethod === "cod" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={shippingDetails.paymentMethod === "cod"}
                      onChange={handleInputChange}
                    />
                    <div>
                      <strong>Cash on Delivery (COD)</strong>
                      <p>Pay when medicines arrive at the delivery address.</p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-confirm-order"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Processing..."
                    : shippingDetails.paymentMethod === "online"
                    ? `Pay via Razorpay (₹${grandTotal})`
                    : `Place Order via COD (₹${grandTotal})`}
                </button>
              </form>
            </div>

            {/* Right Column: Items Summary & Cost Breakdown */}
            <div className="order-items-card">
              <h3>Items in Your Order ({cartItems.length})</h3>

              <div className="summary-items-scroll">
                {cartItems.map((item) => {
                  const med = item.medicine || {};
                  const medName = med.medicineName || med.MedicineName || "Medicine";
                  const price = med.prices || med.Price || item.Price || 0;
                  const quantity = item.qunatity || item.quantity || item.Quantity || 1;
                  const image = med.image || med.Img;

                  return (
                    <div key={item.cartid || item.id} className="summary-item-row">
                      <img
                        src={image || "https://via.placeholder.com/60?text=Medicine"}
                        alt={medName}
                        className="summary-item-thumb"
                      />
                      <div className="summary-item-info">
                        <h4>{medName}</h4>
                        <span className="qty-tag">
                          Qty: {quantity} x ₹{price}
                        </span>
                      </div>
                      <div className="summary-item-price">
                        ₹{price * quantity}
                      </div>
                    </div>
                  );
                })}
              </div>

              <hr className="summary-divider" />

              <div className="cost-breakdown">
                <div className="cost-row">
                  <span>Items Subtotal</span>
                  <span className="val-bold">₹{subtotal}</span>
                </div>
                <div className="cost-row">
                  <span>Delivery Charge</span>
                  <span>
                    {deliveryCharge === 0 ? (
                      <span className="free-tag">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>
                <hr className="summary-divider" />
                <div className="cost-row total-cost-row">
                  <span>Grand Total</span>
                  <span className="total-highlight">₹{grandTotal}</span>
                </div>
              </div>

              <div className="trust-info-box">
                <p>🔒 <strong>100% Genuine Medicines Guarantee</strong></p>
                <p>🚚 Delivered safely in hygienic, sealed packaging.</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default OrderSummary;