import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "./Home.css";

function Home() {
  const [phone, setPhone] = useState("");
  const [showCoupon, setShowCoupon] = useState(false);
  const [sending, setSending] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();

  const couponCode = "DIWALI0690";

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return alert("Please enter a valid mobile number.");
    setSending(true);

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/coupons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
    } catch (error) {}
    setSending(false);
    setShowCoupon(true);

    confetti({
      particleCount: 60,
      spread: 45,
      origin: { y: 0.6 },
      colors: ["#c47c00", "#f6e7b2"],
      scalar: 0.8,
      ticks: 120
    });
  };

  // Shop Now handler: go to shop categories section
  const handleShopNow = (e) => {
    e.preventDefault();
    navigate("/shop");
    // If your categories section uses another route like "/shop/categories", use that instead:
    // navigate("/shop/categories");
  };

  // Copy coupon code
  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1300);
  };

  return (
    <div className="home-root">
      <section className="hero">
        <img src="/Diwali Elite Fireworks.svg" alt="Diwali Elite Fireworks Logo" className="hero-logo" />
        <div className="hero-content">
          <h1>
            Celebrate Diwali with <span className="brand">Elite Fireworks</span>
          </h1>
          <p className="hero-desc">
            A classic way to light up your festival—premium crackers, home delivery, special offers.
          </p>
          <div className="hero-btns">
            <button className="cta-btn" onClick={handleShopNow}>Shop Now</button>
            <a href="/offers" className="cta-btn offers-btn">View Offers</a>
          </div>
          <form className="coupon-form" onSubmit={handleCouponSubmit}>
            <label htmlFor="phone" className="coupon-label">
              Get 20% OFF! Enter your mobile number:
            </label>
            <input
              type="tel"
              id="phone"
              className="coupon-input"
              maxLength={10}
              minLength={10}
              placeholder="Enter mobile number"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
              required
              disabled={showCoupon}
            />
            <button
              type="submit"
              className="coupon-btn"
              disabled={sending || showCoupon}
              style={{ position: "relative" }}
            >
              {sending ? (
                <span className="sending-spinner">
                  <span className="spinner"></span>
                  <span style={{ marginLeft: 8 }}>Sending...</span>
                </span>
              ) : showCoupon ? "Sent!" : "Get Coupon"}
            </button>
          </form>
          {showCoupon && (
            <div className="coupon-success">
              Your coupon code:
              <span className="coupon-code">{couponCode}</span>
              <button
                className="coupon-copy-btn"
                onClick={handleCopyCoupon}
                title="Copy Coupon"
                tabIndex={0}
                style={{ marginLeft: 8, verticalAlign: "middle", background: "none", border: "none", cursor: "pointer" }}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <rect x="5" y="6" width="10" height="10" rx="2" stroke="#a67c00" strokeWidth="1.5" fill="#fffbe7"/>
                  <rect x="8" y="4" width="7" height="7" rx="1.2" stroke="#a67c00" strokeWidth="1" fill="#fffbe7"/>
                </svg>
              </button>
              {copySuccess && <span className="coupon-copied">Copied!</span>}
              <br />
              Use this for 20% OFF in your cart value!
            </div>
          )}
        </div>
      </section>

      <section className="festive-banners">
        <div className="banner-card">
          <h3>Limited Time Offer</h3>
          <p>Flat 20% OFF on combos. Free delivery on minimum order value ₹1000.</p>
        </div>
        <div className="banner-card">
          <h3>New Arrivals</h3>
          <p>Latest fancy series & sky shots added.</p>
        </div>
        <div className="banner-card">
          <h3>Festival Special</h3>
          <p>Elite quality crackers, cash on delivery, instant coupons!</p>
        </div>
      </section>
    </div>
  );
}

export default Home;