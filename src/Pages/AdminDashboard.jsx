import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/AdminDashboard.css';
import axios from 'axios';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';


const AdminDashboard = () => {
  const navigate = useNavigate();
 

  // Navigation Tab State (Default: dashboard)
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('adminActiveTab') || 'dashboard';
  }); 

    const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    localStorage.setItem('adminActiveTab', tabName);
  };

  // Backend Data States (Empty arrays ready for API integration)
  const [medicines, setMedicines] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8080/medicine/viewall")
    .then((response) => {
      setMedicines(response.data);
      console.log("Fetched Medicine: ", response.data);
    })
    .catch((error) => {
      console.error("Error fetching medicines: ", error);
    });
  },[]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // Form State matched with Spring Boot Medicine Entity
  const [newMedicine, setNewMedicine] = useState({
  MedicineName: '',
  MedicineDesc: '',
  ManufactureName: '',
  ManufactureDate: '',
  ExpirationDate: '',
  Ingredients: '',
  Quantity: '',
  Price: '',
  Img: ''
  });

  // POST Request to Add New Medicine
const handleAddSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8080/medicine/add", newMedicine);
    
    alert("Medicine Added Successfully!");
    console.log("Added Medicine Response:", response.data);

    // Reset Form Fields
    setNewMedicine({
          MedicineName: '',
      MedicineDesc: '',
      ManufactureName: '',
      ManufactureDate: '',
      ExpirationDate: '',
      Ingredients: '',
      Quantity: '',
      Price: '',
      Img: ''
    });

    // Refresh inventory list and switch view to see updated items
    fetchMedicines();
    handleTabChange('view-medicines');
  } catch (err) {
    console.error("Error adding medicine:", err);
    alert("Failed to add medicine. Please check backend logs.");
  }
};

  // Handle Input Changes for Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine({
      ...newMedicine,
      [name]: value
    });
  };

  // Handle Logout & Navigation to Login Page
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      navigate('/login');
    }
  };

  // Modal State
const [showModal, setShowModal] = useState(false);
const [editMedicine, setEditMedicine] = useState({
  id: null,
  MedicineName: '',
  MedicineDesc: '',
  ManufactureName: '',
  ManufactureDate: '',
  ExpirationDate: '',
  Ingredients: '',
  Quantity: 0,
  Price: 0,
  Img: ''
});

// Open Modal & Populate Selected Medicine Data
const handleEditClick = (medicine) => {
  setEditMedicine({
    id: medicine.id,
    MedicineName:medicine.MedicineName || '',
    MedicineDesc: medicine.MedicineDesc || '',
    ManufactureName: medicine.ManufactureName || '',
    ManufactureDate: medicine.ManufactureDate || '',
    ExpirationDate: medicine.ExpirationDate || '',
    Ingredients: medicine.Ingredients || '',
    Quantity: medicine.Quantity || 0,
    Price: medicine.Price || 0,
    Img: medicine.Img || ''
  });
  setShowModal(true);
};

const fetchMedicines = useCallback(() => {
    axios.get("http://localhost:8080/medicine/viewall")
      .then((response) => {
        setMedicines(response.data);
        console.log("Fetched Medicine: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicines: ", error);
      });
  }, []);



// Send PATCH request to Spring Boot
const handleUpdateSubmit = async (e) => {
  e.preventDefault();
  try {
    // Uses @PatchMapping("/update/{id}") endpoint
    await axios.patch(`http://localhost:8080/medicine/update/${editMedicine.id}`, editMedicine);
    alert("Medicine Updated Successfully!");
    setShowModal(false);
    fetchMedicines(); // Refresh your medicine list
  } catch (err) {
    console.error("Update error:", err);
    alert("Failed to update medicine.");
  }
};

// Handle Delete Medicine
const handleDeleteClick = async (id) => {
  if (window.confirm("Are you sure you want to delete this medicine?")) {
    try {
      // Calls your Spring Boot @DeleteMapping("/delete/{id}") endpoint
      await axios.delete(`http://localhost:8080/medicine/deletebyid/${id}`);
      alert("Medicine deleted successfully!");
      fetchMedicines(); // Refresh the list from the database
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete medicine.");
    }
  }
};

// API Fetch for Users
const fetchUsers = useCallback(() => {
  axios.get("http://localhost:8080/user/getall")
    .then((response) => {
      setUsers(response.data);
      console.log("Fetched Users: ", response.data);
    })
    .catch((error) => {
      console.error("Error fetching users: ", error);
    });
}, []);


useEffect(() => {
  fetchMedicines();
  fetchUsers(); 
}, [fetchMedicines, fetchUsers]);


 // DASHBOARD 
  // Calculate user status counts dynamically from state
const activeUsersCount = users.filter(user => user.active === true || user.active === 1).length;
const inactiveUsersCount = users.length - activeUsersCount;

const userStatusData = [
  { name: 'Active Users', value: activeUsersCount, fill: '#0d9488' },
  { name: 'Inactive Users', value: inactiveUsersCount, fill: '#e2e8f0' }
];

const toggleStatus = (id) => {
  setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user.id === id
        ? { ...user, active: !user.active }
        : user
    )
  );
};

// Get today's date formatted as YYYY-MM-DD for input min/max attributes
// Single-line local YYYY-MM-DD format
const todayDate = new Date().toLocaleDateString('sv-SE'); //sv = Swedish, SE = Sweden it convert the date formate like YYYY-MM-DD

  // ==========================================
  // SWITCH CASE CONTENT RENDERER
  // ==========================================
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="content-body">
            <h4 className="page-title mb-4">Dashboard Overview</h4>
            {/* STAT CARDS */}
            <div className="row g-4 mb-4">
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="stat-card shadow-sm rounded-3 bg-white p-3 border-start border-primary border-4">
                  <span className="text-muted small fw-semibold">Total Medicines</span>
                  <h3 className="fw-bold text-dark mt-1 mb-0">{medicines.length}</h3>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="stat-card shadow-sm rounded-3 bg-white p-3 border-start border-success border-4">
                  <span className="text-muted small fw-semibold">Total Registered Users</span>
                  <h3 className="fw-bold text-dark mt-1 mb-0">{users.length}</h3>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-4">
                <div className="stat-card shadow-sm rounded-3 bg-white p-3 border-start border-warning border-4">
                  <span className="text-muted small fw-semibold">Total Orders</span>
                  <h3 className="fw-bold text-dark mt-1 mb-0">{orders.length}</h3>
                </div>
              </div>
            </div>

            {/* QUICK ACTIVITY SUMMARY */}
            <div className="med-table-card shadow-sm rounded-3 bg-white p-4 mb-4">
              <h6 className="fw-bold mb-3 text-secondary">Quick Activity Summary</h6>
              <p className="text-muted small mb-0">
                Welcome to your MediShop Admin Panel. Select an option from the sidebar to manage your store's inventory, review registered customers, or monitor customer orders.
              </p>
            </div>


                {/* MEDICINE STOCK QUANTITY CHART */}
<div className="med-table-card shadow-sm rounded-3 bg-white p-4 mb-4">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h6 className="fw-bold m-0 text-dark">Medicine Inventory Stock</h6>
      <small className="text-muted">Available stock quantity by item</small>
    </div>
    <span className="badge bg-teal-subtle text-teal px-3 py-2">
      {medicines.length} Items Listed
    </span>
  </div>

  {medicines.length === 0 ? (
    <p className="text-muted text-center py-4">No inventory data available for chart.</p>
  ) : (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart 
          data={medicines} 
          margin={{ top: 10, right: 30, left: 0, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="MedicineName" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            interval={0}
            angle={-20}
            textAnchor="end"
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' 
            }}
            formatter={(value) => [`${value} units`, 'Stock Quantity']}
          />
          <Bar dataKey="Quantity" fill="#0d9488" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )}
</div>


{/* REGISTERED USERS STATUS BREAKDOWN */}
<div className="med-table-card shadow-sm rounded-3 bg-white p-4 mb-4">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <div>
      <h6 className="fw-bold m-0 text-dark">User Account Status</h6>
      <small className="text-muted">Active vs Inactive breakdown</small>
    </div>
    <span className="badge bg-teal-subtle text-teal px-3 py-2">
      {users.length} Total Users
    </span>
  </div>

  {users.length === 0 ? (
    <p className="text-muted text-center py-4">No users registered yet.</p>
  ) : (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={userStatusData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {userStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} Users`, 'Count']}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )}
</div>

          </div>
          
        );

      case 'view-medicines':
        return (
          <div className="content-body">
            <h4 className="page-title mb-4">All Medicines</h4>
            {medicines.length === 0 ? (
              <div className="empty-state text-center py-5 bg-white rounded-3 shadow-sm">
                <p className="text-muted m-0">No medicines available in database.</p>
              </div>
            ) : (
              <div className="row g-4">
                {medicines.map((medicine) => (
                  <div className="col-12 col-md-6 col-lg-4" key={medicine.id}>
                    <div className="med-card">
                      <div className="med-img-wrapper">
                        <img
                          src={medicine.Img || 'https://via.placeholder.com/200?text=No+Image'}
                          alt={medicine.MedicineName}
                          className="med-img"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <h6 className="fw-bold mb-2 text-dark">{medicine.MedicineName}</h6>
                        <p className="med-info mb-1">
                          <strong>Manufacturer:</strong> {medicine.ManufactureName}
                        </p>
                        <p className="med-info mb-1">
                          <strong>Quantity:</strong> {medicine.Quantity}
                        </p>
                        <p className="med-info mb-1">
                          <strong>Expiry:</strong> {medicine.ExpirationDate}
                        </p>
                        <h5 className="price-tag fw-bold mt-2 mb-3">₹{medicine.Price}</h5>

                        <div className="d-flex justify-content-center gap-2">
                          <button className="btn btn-teal btn-sm px-3" onClick={() => handleEditClick(medicine)}><i className="fa-solid fa-pen-to-square"></i></button>
                          <button className="btn btn-outline-danger btn-sm px-3" onClick={() => handleDeleteClick(medicine.id)} ><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* EDIT MEDICINE MODAL  */}
          {showModal && (
            <div className="custom-modal-backdrop">
              <div className="custom-modal-content">
                <div className="modal-header pb-3 mb-3 border-bottom d-flex justify-content-between align-items-center">
                  <h5 className="fw-bold m-0">Edit Medicine Details</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <form onSubmit={handleUpdateSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-medium">Medicine Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editMedicine.MedicineName}
                        onChange={(e) => setEditMedicine({...editMedicine, MedicineName: e.target.value})}
                         
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-medium">Manufacturer Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editMedicine.ManufactureName}
                        onChange={(e) => setEditMedicine({...editMedicine, ManufactureName: e.target.value})}
                        
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-medium">Description</label>
                    <textarea 
                      className="form-control" 
                      rows="2"
                      value={editMedicine.MedicineDesc}
                      onChange={(e) => setEditMedicine({...editMedicine, MedicineDesc: e.target.value})}
                     
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-medium">Manufacture Date</label>
                      <input 
                        type="date" 
                        className="form-control"
                        max={todayDate} // <-- Restricts manufacture date to today or past 
                        value={editMedicine.ManufactureDate}
                        onChange={(e) => setEditMedicine({...editMedicine, ManufactureDate: e.target.value})}
                        
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-medium">Expiration Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        min={editMedicine.ManufactureDate || todayDate} // <-- Blocks dates prior to manufacture/today
                        value={editMedicine.ExpirationDate}
                        onChange={(e) => setEditMedicine({...editMedicine, ExpirationDate: e.target.value})}
                       
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-medium">Quantity</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={editMedicine.Quantity}
                        onChange={(e) => setEditMedicine({...editMedicine, Quantity: parseInt(e.target.value) || 0})}
                       
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-medium">Price (₹)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        className="form-control" 
                        value={editMedicine.Price}
                        onChange={(e) => setEditMedicine({...editMedicine, Price: parseFloat(e.target.value) || 0})}
                        
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-medium">Ingredients</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editMedicine.Ingredients}
                        onChange={(e) => setEditMedicine({...editMedicine, Ingredients: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-medium">Image URL / Base64</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editMedicine.Img}
                      onChange={(e) => setEditMedicine({...editMedicine, Img: e.target.value})}
                    />
                  </div>

                  <div className="d-flex justify-content-end gap-2 border-top pt-3">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-teal px-4">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          </div>
          
        );

      case 'view-users':
        return (
          <div className="content-body">
            <h4 className="page-title mb-4">Registered Users</h4>
            <div className="med-table-card shadow-sm rounded-3 bg-white p-3">
              {users.length === 0 ? (
                <div className="empty-state text-center py-4">
                  <p className="text-muted m-0">No users registered yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>User ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Gender</th>
                        <th>Role</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>#{user.id}</td>
                          <td className="fw-medium">{user.fullName}</td>
                          <td>{user.email}</td>
                          <td>{user.contact}</td>
                          <td>{user.gender}</td>
                          <td>
                            <span className="badge bg-teal-subtle text-teal">
                              {user.role || 'USER'}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center p-4 ">
                              <div className="form-check form-switch mb-0">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  checked={user.active}
                                  onChange={() => toggleStatus(user.id)}
                                />
                              </div>

                              <span
                                className={`badge ${
                                  user.active
                                    ? "bg-success-subtle text-success"
                                    : "bg-danger-subtle text-danger"
                                }`}
                              >
                                {user.active ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </td>
                           
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );

      case 'view-orders':
        return (
          <div className="content-body">
            <h4 className="page-title mb-4">Customer Orders</h4>
            <div className="med-table-card shadow-sm rounded-3 bg-white p-3">
              {orders.length === 0 ? (
                <div className="empty-state text-center py-4">
                  <p className="text-muted m-0">No orders placed yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Medicine</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                        <th>Order Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td className="fw-medium">{order.userName}</td>
                          <td>{order.medicineName}</td>
                          <td>{order.quantity}</td>
                          <td className="fw-bold text-success">₹{order.totalPrice}</td>
                          <td>{order.orderDate}</td>
                          <td>
                            <span className="badge bg-warning text-dark">
                              {order.status || 'PENDING'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );

      case 'add-medicine':
        return (
          <div className="content-body">
            <h4 className="page-title mb-4">Add New Medicine</h4>
            <div className="med-form-card shadow-sm rounded-3 bg-white p-4">
              <form onSubmit={handleAddSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium">Medicine Name</label>
                  <input
                    type="text"
                    name="MedicineName"
                    className="form-control"
                    placeholder="Enter medicine name"
                    value={newMedicine.MedicineName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">Description</label>
                  <textarea
                    name="MedicineDesc"
                    className="form-control"
                    rows="2"
                    placeholder="Enter short description..."
                    value={newMedicine.MedicineDesc}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">Manufacturer Name</label>
                  <input
                    type="text"
                    name="ManufactureName"
                    className="form-control"
                    placeholder="Enter manufacturer name"
                    value={newMedicine.ManufactureName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">Manufacture Date</label>
                    <input
                      type="date"
                      name="ManufactureDate"
                      className="form-control"
                      max={todayDate} // <-- Restricts manufacture date to today or past
                      value={newMedicine.ManufactureDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">Expiration Date</label>
                    <input
                      type="date"
                      name="ExpirationDate"
                      className="form-control"
                      min={newMedicine.ManufactureDate } // <-- Blocks all dates prior to manufacture/today
                      value={newMedicine.ExpirationDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-medium">Quantity</label>
                    <input
                      type="number"
                      name="Quantity"
                      className="form-control"
                      placeholder="0"
                      value={newMedicine.Quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-medium">Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="Price"
                      className="form-control"
                      placeholder="0.00"
                      value={newMedicine.Price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-medium">Ingredients</label>
                    <input
                      type="text"
                      name="Ingredients"
                      className="form-control"
                      placeholder="Active ingredients"
                      value={newMedicine.Ingredients}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium">Image URL</label>
                  <input
                    type="text"
                    name="Img"
                    className="form-control"
                    placeholder="Paste image URL here"
                    value={newMedicine.Img}
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit" className="btn btn-teal w-100 mt-2 py-2 fw-semibold">
                  Save Medicine
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-5">
            <p className="text-muted">Select an option from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="medishop-admin-container">
      {/* SIDEBAR NAVIGATION */}
      <aside className="medishop-sidebar">
        <div className="sidebar-brand-box">
          <h2 className="logo m-0">
            <span className="medi">Medi</span>
            <span className="shop">Shop</span>
          </h2>
          <span className="admin-badge">Admin</span>
        </div>

        <ul className="sidebar-menu-list">
          <li
            className={`sidebar-menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleTabChange('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'view-medicines' ? 'active' : ''}`}
            onClick={() => handleTabChange('view-medicines')}
          >
            View All Medicines
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'view-users' ? 'active' : ''}`}
            onClick={() => handleTabChange('view-users')}
          >
            View All Users
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'view-orders' ? 'active' : ''}`}
            onClick={() => handleTabChange('view-orders')}
          >
            View All Orders
          </li>
          <li
            className={`sidebar-menu-item ${activeTab === 'add-medicine' ? 'active' : ''}`}
            onClick={() => handleTabChange('add-medicine')}
          >
            Add New Medicine
          </li>
        </ul>

        {/* LOGOUT BUTTON */}
        <div className="sidebar-footer">
          <button type="button" className="btn btn-danger-custom w-100" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="medishop-main-content">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;