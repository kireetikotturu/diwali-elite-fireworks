import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  const handleExplore = () => {
    // Always go to categories section of Shop page
    navigate("/shop");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="about-root">
      <div className="about-main-card">
        <h1 className="about-title">Welcome to Elite Fireworks Online</h1>
        <div className="about-desc">
          <b>Elite Fireworks</b> is your trusted destination for top-quality crackers and fireworks, serving thousands of happy customers for over <span className="about-highlight">five years</span>.<br /><br />
          With our roots in traditional offline sales, we now bring the same excellence and festive joy to the digital world—making it easier, safer, and more affordable for every family to celebrate their special moments.
        </div>
        <div className="about-explore-btn-row">
          <button className="about-explore-btn" onClick={handleExplore}>
            🎆 Explore Our Products
          </button>
        </div>
      </div>

      <div className="about-section-card">
        <h2 className="about-section-title">Our Vision</h2>
        <div className="about-section-desc">
          To spread happiness and unforgettable celebrations by providing safe, unique, and eco-friendly crackers—without compromising on quality.
        </div>
      </div>
      <div className="about-section-card">
        <h2 className="about-section-title">Our Mission</h2>
        <div className="about-section-desc">
          We never sacrifice safety or quality—because your joy and wellbeing matter. Every product undergoes strict testing and quality checks, ensuring your celebrations sparkle safely.
        </div>
      </div>
      <div className="about-section-card">
        <h2 className="about-section-title">Our Motto</h2>
        <div className="about-section-desc">
          To make high-quality crackers accessible at factory-direct prices, so everyone can enjoy bigger discounts and more happiness. Each batch is crafted with care, so you can celebrate every occasion with confidence and delight.
        </div>
      </div>
      <div className="about-section-card">
        <h2 className="about-section-title">Why Choose Elite Fireworks?</h2>
        <ul className="about-list">
          <li>✅ Trusted by thousands of families and businesses</li>
          <li>✅ Premium, lab-tested Sivakasi crackers and fireworks</li>
          <li>✅ Direct-from-factory prices—no middlemen, no markups</li>
          <li>✅ Huge discounts, exclusive combos, and festive gifts</li>
          <li>✅ Fast and safe delivery to your doorstep</li>
          <li>✅ Dedicated support before and after your purchase</li>
        </ul>
      </div>
      <div className="about-footer-note">
        <b>Join the Elite family—make every celebration brighter, safer, and more memorable!</b>
        <br /><br />
        <span className="about-contact-info">
          Need help? <a href="/contact" className="about-contact-link">Contact us</a> any time.
        </span>
      </div>
    </div>
  );
}

export default About;