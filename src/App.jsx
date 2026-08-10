import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './Pages/Cart';
import AdminDashboard from './Pages/AdminDashboard';
import UserDashboard from './Pages/UserDashboard';
import ForgotPassword from './Pages/ForgotPassword';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Products from './Pages/Products';

// Layout component to selectively render Header and Footer
const MainLayout = ({ children }) => {
  const location = useLocation();
  // Hide Header and Footer on Admin Dashboard
  const isAdminDashboard = location.pathname === '/admindashboard';

  return (
    <>
      {!isAdminDashboard && <Header />}
      {children}
      {!isAdminDashboard && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;