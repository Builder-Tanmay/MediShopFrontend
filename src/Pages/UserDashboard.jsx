import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../CSS/UserDashboard.css";

const UserDashboard = () => {
  // Get logged-in user details
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.user?.fullName || storedUser?.fullName || "User";

  // Data states
  const [medicines, setMedicines] = useState([]);
  const [wishlist, setWishlist] = useState({});

  // Filter states
  const [search, setSearch] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('ALL');
  const [sortPrice, setSortPrice] = useState('DEFAULT');

  // Fetch medicines on load
  useEffect(() => {
    axios.get("http://localhost:8080/medicine/viewall")
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicines: ", error);
      });
  }, []);

  // Toggle Heart / Wishlist
  const toggleWishlist = (id) => {
    setWishlist({ ...wishlist, [id]: !wishlist[id] });
  };

  // Get unique list of manufacturers for the dropdown
  const manufacturers = [...new Set(medicines.map(m => m.ManufactureName).filter(Boolean))];

  // Easy Filter Logic
  let filteredMedicines = medicines.filter((med) => {
    const matchesSearch = med.MedicineName?.toLowerCase().includes(search.toLowerCase());
    const matchesMfg = selectedManufacturer === 'ALL' || med.ManufactureName === selectedManufacturer;
    return matchesSearch && matchesMfg;
  });

  // Sort Logic
  if (sortPrice === 'LOW_TO_HIGH') {
    filteredMedicines.sort((a, b) => a.Price - b.Price);
  } else if (sortPrice === 'HIGH_TO_LOW') {
    filteredMedicines.sort((a, b) => b.Price - a.Price);
  }

  // Reset all filters
  const resetFilters = () => {
    setSearch('');
    setSelectedManufacturer('ALL');
    setSortPrice('DEFAULT');
  };

   const handleAddToCart = (product) => {
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

  return (
    <div className="container py-4 page-container">
      {/* Welcome Heading */}
      <div className="text-center mb-4">
        <h2>Welcome, <span className="text-teal">{userName}</span> 👋</h2>
        <p className="text-muted">Explore available medicines and add them to your cart.</p>
      </div>

      {/* Filter Bar */}
      <div className="card p-3 mb-4 shadow-sm border-0 rounded-3">
        <div className="row g-3">
          
          {/* Search Bar */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search medicine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Manufacturer Filter */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
            >
              <option value="ALL">All Manufacturers</option>
              {manufacturers.map((mfg, idx) => (
                <option key={idx} value={mfg}>{mfg}</option>
              ))}
            </select>
          </div>

          {/* Price Sorting */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={sortPrice}
              onChange={(e) => setSortPrice(e.target.value)}
            >
              <option value="DEFAULT">Sort by Price</option>
              <option value="LOW_TO_HIGH">Price: Low to High</option>
              <option value="HIGH_TO_LOW">Price: High to Low</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="col-md-2">
            <button className="btn btn-outline-secondary w-100" onClick={resetFilters}>
              Reset
            </button>
          </div>

        </div>
      </div>

      {/* Medicines Cards */}
      <h4 className="mb-3">Available Medicines</h4>

      {filteredMedicines.length === 0 ? (
        <div className="text-center py-5 bg-white rounded shadow-sm">
          <p className="text-muted m-0">No medicines found matching your criteria.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredMedicines.map((medicine) => {
            const medId = medicine.id || medicine.medicineId;
            const isWishlisted = wishlist[medId];
            const isAvailable = medicine.Quantity > 0;
            return (
              <div className="col-12 col-md-6 col-lg-4" key={medId}>
                <div className="card h-100 med-card border-0 shadow-sm rounded-3">
                  
                  {/* Image & Wishlist Button */}
                  <div className="position-relative text-center p-3 bg-light rounded-top">
                    <img
                      src={medicine.Img || 'https://via.placeholder.com/180?text=No+Image'}
                      alt={medicine.MedicineName}
                      className="med-img"
                    />
                    <button
                      className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                      onClick={() => toggleWishlist(medId)}
                    >
                      <i className={isWishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-bold mb-2 text-dark">{medicine.MedicineName}</h5>
                      <p className="mb-1 text-muted small"><strong>Manufacturer:</strong> {medicine.ManufactureName}</p>
                      <p className="mb-1 text-muted small"><strong>Quantity:</strong> {medicine.Quantity}</p>
                      <p className="mb-2 text-muted small"><strong>Expiry:</strong> {medicine.ExpirationDate}</p>
                    </div>

                    {/* Price and Cart Action */}
                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                      <span className="fs-5 fw-bold text-teal">₹{medicine.Price}</span>
                      
                        
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;