import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart ? cart.reduce((sum, item) => sum + (item.qty || 1), 0) : 0;

  const handleNavClick = () => setMenuOpen(false);
  const goHome = () => {
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={goHome}>
        <img src="/diwali-elite-fireworks.png" alt="Diwali Elite Fireworks" className="logo-img" />
        <span className="logo-text">Diwali Elite Fireworks</span>
      </div>
      <div className="navbar-icons">
        <Link to="/cart" className="navbar-cart-link" aria-label="Cart" onClick={handleNavClick}>
          <span className="navbar-cart-icon-wrap">
            <img src="/shopping-cart-icon.svg" alt="Cart" className="navbar-cart-icon" />
            {cartCount > 0 && (
              <span className="navbar-cart-count">{cartCount}</span>
            )}
          </span>
        </Link>
        <button
          className="navbar-hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/" onClick={handleNavClick}>Home</Link>
        </li>
        <li className={location.pathname === "/shop" ? "active" : ""}>
          <Link to="/shop" onClick={handleNavClick}>Shop</Link>
        </li>
        <li className={location.pathname === "/offers" ? "active" : ""}>
          <Link to="/offers" onClick={handleNavClick}>Offers</Link>
        </li>
        <li className={location.pathname === "/about" ? "active" : ""}>
          <Link to="/about" onClick={handleNavClick}>About Us</Link>
        </li>
        <li className={location.pathname === "/contact" ? "active" : ""}>
          <Link to="/contact" onClick={handleNavClick}>Contact Us</Link>
        </li>
      </ul>
      {menuOpen && <div className="navbar-backdrop" onClick={handleNavClick}></div>}
    </nav>
  );
}

export default Navbar;