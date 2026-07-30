import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import About from './Pages/About'
import Services from './Pages/Services'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Cart from './Pages/Cart'
import AdminDashboard from './Pages/AdminDashboard'
import UserDashboard from './Pages/UserDashboard'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ForgotPassword from './Pages/ForgotPassword'


function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}

export default App
