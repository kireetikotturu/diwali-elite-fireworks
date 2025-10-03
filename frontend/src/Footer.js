import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  // Helper to scroll to top and navigate
  const handleNav = (to) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(to);
  };

  return (
    <footer className="footer-root">
      <div className="footer-sections">
        <div className="footer-col">
          <div className="footer-title">Quick Links</div>
          <button className="footer-link" onClick={() => handleNav("/about")}>About Us</button>
          <button className="footer-link" onClick={() => handleNav("/contact")}>Contact Us</button>
          <button className="footer-link" onClick={() => handleNav("/shop")}>Quick Purchase</button>
        </div>
        <div className="footer-col">
          <div className="footer-title">Our Policies</div>
          <button className="footer-link" onClick={() => handleNav("/terms")}>Terms & Conditions</button>
          <button className="footer-link" onClick={() => handleNav("/shipping")}>Shipping & Payment Policy</button>
        </div>
        <div className="footer-col social-col">
          <div className="footer-title">Connect</div>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="footer-social-icon whatsapp">
            <img src="/whatsapplogo.svg" alt="WhatsApp" />
          </a>
          <a href="mailto:elitecrackersonline@gmail.com" className="footer-social-icon mail">
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="8" width="26" height="16" rx="4" fill="#fffbe7" stroke="#c47c00" strokeWidth="2"/>
              <path d="M5 10l11 9 11-9" stroke="#e040fb" strokeWidth="2" fill="none"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 Elite Crackers Online. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;