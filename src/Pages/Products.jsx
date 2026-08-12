import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Products.css";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Medicines", "Equipment", "Supplements", "Personal Care"];

  // Fetch Products from Spring Boot Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Exact endpoint matching your Controller: @RequestMapping("/medicine") + @GetMapping("/viewall")
        const response = await fetch("http://localhost:8080/medicine/viewall");
        if (!response.ok) {
          throw new Error("Failed to load medicines from server");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add Product to Cart with LOGIN CHECK
  const handleAddToCart = (product) => {
    // 1. Verify if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login first to add products to your cart!");
      navigate("/login");
      return;
    }

    // 2. Add to localStorage cart if logged in
    let cart = JSON.parse(localStorage.getItem("medishop_cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].Quantity = (cart[existingIndex].Quantity || 1) + 1;
    } else {
      cart.push({ ...product, Quantity: 1 });
    }

    localStorage.setItem("medishop_cart", JSON.stringify(cart));
    alert(`${product.MedicineName} added to cart successfully!`);
  };

  // Filter products based on Category & Search Input using entity fields
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.MedicineName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="medishop-page-wrapper">
      <div className="medishop-container">
        
        {/* Banner Section */}
        <section className="medishop-hero-banner">
          <span className="brand-badge">
            <span className="badge-dot"></span> Verified Healthcare Essentials
          </span>
          <h1>
            Explore <span className="text-teal">Healthcare</span> & <span className="text-navy">Medicines</span>
          </h1>
          <p>Get authentic prescription medicines and healthcare products delivered to your door.</p>

          {/* Search Box */}
          <div className="medishop-search-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search for medicines, healthcare items, or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery("")}>&times;</button>
            )}
          </div>
        </section>

        {/* Category Filter Pills */}
        <div className="medishop-category-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="medishop-status-box">
            <div className="status-spinner"></div>
            <p>Fetching medicines & healthcare products...</p>
          </div>
        )}

        {error && !loading && (
          <div className="medishop-status-box error-box">
            <p>⚠️ {error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="medishop-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const isAvailable = product.Quantity > 0;
                return (
                  <div key={product.id} className="medishop-card">
                    <div className="card-image-wrapper">
                      <img
                        src={product.Img || "https://via.placeholder.com/250?text=MediShop+Product"}
                        alt={product.MedicineName}
                      />
                      {isAvailable ? (
                        <span className="stock-tag in-stock">In Stock</span>
                      ) : (
                        <span className="stock-tag out-stock">Out of Stock</span>
                      )}
                    </div>

                    <div className="card-content">
                      <span className="category-tag">{product.ManufactureName || "Medicine"}</span>
                      <h3 className="product-title">{product.MedicineName}</h3>
                      <p className="product-desc">{product.MedicineDesc}</p>

                      <div className="card-footer-row">
                        <div className="price-block">
                          <span className="price-current">₹{product.Price}</span>
                        </div>

                        <button
                          className="btn-add-cart"
                          disabled={!isAvailable}
                          onClick={() => handleAddToCart(product)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                          </svg>
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="medishop-empty-grid">
                <div className="empty-icon-box">💊</div>
                <h3>No Medicines or Products Available</h3>
                <p>Try searching for another category or check back later.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;