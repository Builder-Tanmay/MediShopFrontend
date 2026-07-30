import React from "react";
import "../CSS/Home.css";
import { Link } from "react-router-dom";
import { 
  FaSearch, 
  FaPrescriptionBottleAlt, 
  FaUserNurse, 
  FaPercent, 
  FaArrowRight, 
  FaShieldAlt, 
  FaTruck, 
  FaClock 
} from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { 
  FaHeartbeat, 
  FaCapsules, 
  FaBaby, 
  FaPumpSoap, 
  FaBandAid, 
  FaLungs 
} from "react-icons/fa";
import { 
  FaBoxOpen, 
  FaTruckLoading, 
  FaUserMd 
} from "react-icons/fa";


const Home = () => {
  const categories = [
    {
      id: 1,
      title: "Diabetes & BP Care",
      desc: "Monitors, test strips & daily meds",
      icon: <FaHeartbeat />,
      colorClass: "cat-blue",
      link: "/products?category=diabetes"
    },
    {
      id: 2,
      title: "Vitamins & Immunity",
      desc: "Supplements for daily energy",
      icon: <FaCapsules />,
      colorClass: "cat-green",
      link: "/products?category=vitamins"
    },
    {
      id: 3,
      title: "Respiratory Care",
      desc: "Inhalers, masks & nebulizers",
      icon: <FaLungs />,
      colorClass: "cat-purple",
      link: "/products?category=respiratory"
    },
    {
      id: 4,
      title: "Baby & Mother Care",
      desc: "Nutrition, diapers & skincare",
      icon: <FaBaby />,
      colorClass: "cat-orange",
      link: "/products?category=baby-care"
    },
    {
      id: 5,
      title: "Personal Care",
      desc: "Skin, hair & hygiene essentials",
      icon: <FaPumpSoap />,
      colorClass: "cat-teal",
      link: "/products?category=personal-care"
    },
    {
      id: 6,
      title: "First Aid & Devices",
      desc: "Bandages, thermometers & kits",
      icon: <FaBandAid />,
      colorClass: "cat-red",
      link: "/products?category=first-aid"
    }
  ];

  const trustItems = [
    {
      id: 1,
      icon: <FaShieldAlt />,
      title: "100% Genuine Guarantee",
      description: "Directly sourced from licensed pharmaceutical brands.",
      themeClass: "trust-blue"
    },
    {
      id: 2,
      icon: <FaBoxOpen />,
      title: "Discreet & Sealed Packaging",
      description: "Tamper-proof safety packaging for your total privacy.",
      themeClass: "trust-green"
    },
    {
      id: 3,
      icon: <FaTruckLoading />,
      title: "Express Doorstep Shipping",
      description: "Fast local city delivery within 24 to 48 hours.",
      themeClass: "trust-purple"
    },
    {
      id: 4,
      icon: <FaUserMd />,
      title: "Certified Pharmacist Help",
      description: "Get expert advice and prescription reviews online.",
      themeClass: "trust-teal"
    }
  ];

  return (
    <>
    <main className="home-wrapper">
      
      {/* HERO CAROUSEL SECTION WITH BACKGROUND IMAGES */}
      <section className="hero-carousel-wrapper">
        <div 
            id="mediShopCarousel" 
            className="carousel slide carousel-fade" 
            data-bs-ride="carousel" 
            data-bs-interval="2000"
          >
          {/* Indicators / Dots */}
          <div className="carousel-indicators custom-dots">
            <button 
              type="button" 
              data-bs-target="#mediShopCarousel" 
              data-bs-slide-to="0" 
              className="active" 
              aria-current="true" 
              aria-label="Slide 1"
            ></button>
            <button 
              type="button" 
              data-bs-target="#mediShopCarousel" 
              data-bs-slide-to="1" 
              aria-label="Slide 2"
            ></button>
            <button 
              type="button" 
              data-bs-target="#mediShopCarousel" 
              data-bs-slide-to="2" 
              aria-label="Slide 3"
            ></button>
          </div>

          {/* Carousel Slides */}
          <div className="carousel-inner">
            
            {/* SLIDE 1: Online Pharmacy */}
            <div className="carousel-item active slide-bg-1">
              <div className="carousel-overlay"></div>
              <div className="container slide-container">
                <div className="slide-content">
                  <span className="hero-badge badge-blue">
                    <FaPrescriptionBottleAlt className="me-2" /> 100% Genuine Medicines
                  </span>
                  <h1 className="hero-title">
                    Your Trusted Partner In <br />
                    <span className="highlight-text-blue">Healthcare & Wellness</span>
                  </h1>
                  <p className="hero-desc">
                    Get authentic prescription medicines, healthcare devices, and daily personal care items delivered safely to your home.
                  </p>

                  {/* Interactive Search */}
                  <div className="hero-search-box">
                    <FaSearch className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search for medicines, healthcare items, or brands..." 
                    />
                    <button className="btn-search">Search</button>
                  </div>

                  <div className="hero-btn-group mt-4">
                    <Link to="/products" className="btn btn-primary-hero">
                      Order Medicines <FaArrowRight className="ms-2" />
                    </Link>
                    <Link to="/upload-prescription" className="btn btn-outline-hero">
                      Upload Prescription
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDE 2: Personal Care & Essentials */}
            <div className="carousel-item slide-bg-2">
              <div className="carousel-overlay"></div>
              <div className="container slide-container">
                <div className="slide-content">
                  <span className="hero-badge badge-green">
                    <FaUserNurse className="me-2" /> Expert Care Products
                  </span>
                  <h1 className="hero-title">
                    Premium Wellness & <br />
                    <span className="highlight-text-green">Personal Care Range</span>
                  </h1>
                  <p className="hero-desc">
                    Explore top-rated vitamins, supplements, skin care essentials, and medical devices curated by healthcare professionals.
                  </p>
                  <div className="hero-btn-group mt-4">
                    <Link to="/products" className="btn btn-primary-hero bg-green">
                      Explore Products <FaArrowRight className="ms-2" />
                    </Link>
                    <Link to="/services" className="btn btn-outline-hero">
                      Our Health Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDE 3: Refill Discounts & Offers */}
            <div className="carousel-item slide-bg-3">
              <div className="carousel-overlay"></div>
              <div className="container slide-container">
                <div className="slide-content">
                  <span className="hero-badge badge-red">
                    <FaPercent className="me-2" /> Mega Refill Offer
                  </span>
                  <h1 className="hero-title">
                    Save Up To <span className="highlight-text-red">25% OFF</span> <br />
                    On Monthly Medicine Refills
                  </h1>
                  <p className="hero-desc">
                    Subscribe to monthly prescription refills and enjoy instant cashback, guaranteed stock, and free doorstep delivery.
                  </p>
                  <div className="hero-btn-group mt-4">
                    <Link to="/products" className="btn btn-primary-hero bg-red">
                      Claim Offer Now <FaArrowRight className="ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Controls */}
          <button 
            className="carousel-control-prev custom-nav-btn" 
            type="button" 
            data-bs-target="#mediShopCarousel" 
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button 
            className="carousel-control-next custom-nav-btn" 
            type="button" 
            data-bs-target="#mediShopCarousel" 
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>

        </div>
      </section>

      {/* QUICK TRUST BAR BELOW HERO */}
      <section className="trust-features-bar">
        <div className="container">
          <div className="row g-4">
            
            <div className="col-md-4">
              <div className="trust-item-card">
                <div className="icon-wrapper icon-blue">
                  <FaTruck />
                </div>
                <div>
                  <h6>Fast Doorstep Shipping</h6>
                  <p>Guaranteed express delivery in 24 hrs</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="trust-item-card">
                <div className="icon-wrapper icon-green">
                  <FaShieldAlt />
                </div>
                <div>
                  <h6>100% Genuine Medicines</h6>
                  <p>Directly sourced from verified brands</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="trust-item-card">
                <div className="icon-wrapper icon-purple">
                  <FaClock />
                </div>
                <div>
                  <h6>24/7 Pharmacist Help</h6>
                  <p>Free consultation with experts</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>


    <div className="ticker-wrapper ">
      <div className="ticker-content ">
        
        {/* Item 1 */}
        <div className="ticker-item ">
          <FaPercent className="ticker-icon text-red" />
          <span>Flat 20% OFF on your first medicine order — Use Code: <strong>MEDISWISS</strong></span>
        </div>

        {/* Item 2 */}
        <div className="ticker-item">
          <FaTruck className="ticker-icon text-blue" />
          <span>Free Doorstep Delivery on all orders above ₹499</span>
        </div>

        {/* Item 3 */}
        <div className="ticker-item">
          <FaTag className="ticker-icon text-green" />
          <span>Extra 10% Cashback on Refill Subscriptions</span>
        </div>

        {/* Item 4 */}
        <div className="ticker-item">
          <FaShieldAlt className="ticker-icon text-blue" />
          <span>100% Genuine & Verified Healthcare Essentials</span>
        </div>

        {/* DUPLICATE SET FOR SEAMLESS INFINITE LOOP */}
        <div className="ticker-item" aria-hidden="true">
          <FaPercent className="ticker-icon text-red" />
          <span>Flat 20% OFF on your first medicine order — Use Code: <strong>MEDISWISS</strong></span>
        </div>

        <div className="ticker-item" aria-hidden="true">
          <FaTruck className="ticker-icon text-blue" />
          <span>Free Doorstep Delivery on all orders above ₹499</span>
        </div>

        <div className="ticker-item" aria-hidden="true">
          <FaTag className="ticker-icon text-green" />
          <span>Extra 10% Cashback on Refill Subscriptions</span>
        </div>

        <div className="ticker-item" aria-hidden="true">
          <FaShieldAlt className="ticker-icon text-blue" />
          <span>100% Genuine & Verified Healthcare Essentials</span>
        </div>

      </div>
    </div>

    <section className="categories-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head text-center mb-4">
          <span className="sub-title">Browse By Need</span>
          <h2>Shop by Health Condition</h2>
          <p>Find authentic medicines and essentials organized by health concerns.</p>
        </div>

        {/* Categories Grid */}
        <div className="row g-4">
          {categories.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <div to={item.link} className="category-card-link">
                <div className="category-card">
                  <div className={`icon-box ${item.colorClass}`}>
                    {item.icon}
                  </div>
                  <div className="card-info">
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

    <section className="trust-badges-section">
      <div className="container">
        <div className="trust-badges-card">
          <div className="row g-4">
            {trustItems.map((item) => (
              <div key={item.id} className="col-lg-3 col-sm-6">
                <div className="trust-badge-item">
                  <div className={`badge-icon-box ${item.themeClass}`}>
                    {item.icon}
                  </div>
                  <div className="badge-text">
                    <h6>{item.title}</h6>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>


    </>
  );
};

export default Home;