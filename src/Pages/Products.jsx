import React, { useState } from "react";
import "../CSS/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  /* ============================================================
   * BACKEND INTEGRATION LOGIC (UNCOMMENT WHEN API IS READY)
   * ============================================================
   * 
   * const [loading, setLoading] = useState(true);
   * const [error, setError] = useState(null);
   * 
   * useEffect(() => {
   *   const fetchProducts = async () => {
   *     try {
   *       setLoading(true);
   *       const response = await fetch('/api/products');
   *       if (!response.ok) throw new Error('Failed to fetch products');
   *       const data = await response.json();
   *       setProducts(data);
   *     } catch (err) {
   *       setError(err.message);
   *     } finally {
   *       setLoading(false);
   *     }
   *   };
   *   fetchProducts();
   * }, []);
   * 
   * const handleAddToCart = async (productId) => {
   *   try {
   *     const response = await fetch('/api/cart/add', {
   *       method: 'POST',
   *       headers: { 'Content-Type': 'application/json' },
   *       body: JSON.stringify({ productId, quantity: 1 })
   *     });
   *     if (!response.ok) throw new Error('Failed to add item');
   *     alert('Item added to cart!');
   *   } catch (err) {
   *     console.error(err);
   *   }
   * };
   * ============================================================ */

  const handleAddToCartPlaceholder = (productName) => {
    alert(`Added ${productName} to cart!`);
  };

  const categories = ["All", "Medicines", "Equipment", "Supplements", "Personal Care"];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="medishop-page-wrapper">
      <div className="medishop-container">
        
        {/* Banner Section matching Hero Style */}
        <section className="medishop-hero-banner">
          <span className="brand-badge">
            <span className="badge-dot"></span> Verified Healthcare Essentials
          </span>
          <h1>
            Explore <span className="text-teal">Healthcare</span> & <span className="text-navy">Medicines</span>
          </h1>
          <p>Get authentic prescription medicines and healthcare products delivered to your door.</p>

          {/* Search Bar matching Home Page */}
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

        {/* Category Pills */}
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

        {/* Products Grid */}
        <div className="medishop-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id || product.id} className="medishop-card">
                <div className="card-image-wrapper">
                  <img
                    src={product.image || "https://via.placeholder.com/250?text=MediShop+Product"}
                    alt={product.name}
                  />
                  {product.inStock ? (
                    <span className="stock-tag in-stock">In Stock</span>
                  ) : (
                    <span className="stock-tag out-stock">Out of Stock</span>
                  )}
                </div>

                <div className="card-content">
                  <span className="category-tag">{product.category}</span>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-desc">{product.description}</p>

                  <div className="card-footer-row">
                    <div className="price-block">
                      <span className="price-current">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="price-old">₹{product.originalPrice}</span>
                      )}
                    </div>

                    <button
                      className="btn-add-cart"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCartPlaceholder(product.name)}
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
            ))
          ) : (
            <div className="medishop-empty-grid">
              <div className="empty-icon-box">💊</div>
              <h3>No Medicines or Products Available</h3>
              <p>Try searching for another category or check back later.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Products;