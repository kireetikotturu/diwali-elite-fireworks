import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./Offers.css";

function Offers() {
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const couponCode = "DIWALI0690";

  // Submit mobile number, send to backend (like Home.js)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert("Please enter a valid mobile number.");
      return;
    }
    setSending(true);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/coupons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      setSent(true);
      confetti({
        particleCount: 60,
        spread: 45,
        origin: { y: 0.6 },
        colors: ["#c47c00", "#f6e7b2"],
        scalar: 0.8,
        ticks: 120,
      });
    } catch (err) {
      alert("Failed to send. Please try again.");
    }
    setSending(false);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1200);
  };

  return (
    <div className="offers-root">
      <div className="offers-intro-card">
        <h1 className="offers-brand-title">Elite Fireworks Online</h1>
        <div className="offers-brand-desc">
          <span className="offers-highlight">India's No.1 Trusted Crackers Platform</span> <br />
          <b>Serving thousands of happy customers for 5+ years.</b><br />
          <span className="offers-special-discount">
            🎉 This Diwali, unlock <b>huge discounts</b> – never seen before in any online or offline store!
          </span>
        </div>
        <ul className="offers-promo-list">
          <li>🔥 <b>Buy above ₹2000</b> for <b>exciting gifts</b> & extra special discounts.</li>
          <li>🎆 <b>Free Delivery</b> on orders above <b>₹1000</b>.</li>
          <li>✨ <b>Special Coupon:</b> Get <b>20% OFF</b> instantly! Enter your mobile number below.</li>
          <li>🎁 <b>Exclusive combos</b> at up to <span style={{color:"#e040fb"}}>50% OFF</span>.</li>
        </ul>
        <div className="offers-coupon-process">
          <b>How to get your discount?</b> Enter your mobile number below and click "Get Coupon".
          <br />
          <span style={{color:"#6342a7"}}>
            Your coupon will be shown here and sent to our team. <br />
            <b>Use it in your cart when placing your order to get 20% OFF!</b>
          </span>
        </div>
      </div>

      <form className="offers-form" onSubmit={handleSubmit}>
        <label htmlFor="offers-phone" className="offers-form-label">
          Enter your mobile number for instant coupon & best offers:
        </label>
        <input
          type="tel"
          id="offers-phone"
          maxLength={10}
          minLength={10}
          className="offers-form-input"
          placeholder="Enter mobile number"
          value={phone}
          onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
          required
          disabled={sent}
        />
        <button
          type="submit"
          className="offers-form-btn"
          disabled={sending || sent}
        >
          {sending ? "Sending..." : sent ? "Sent!" : "Get Coupon"}
        </button>
        {sent && (
          <div className="offers-form-success">
            <span>
              Your coupon code:&nbsp;
              <span className="offers-coupon-highlight">{couponCode}</span>
              <button
                className="offers-copy-btn"
                type="button"
                title="Copy Coupon"
                onClick={handleCopyCoupon}
                tabIndex={0}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect
                    x="5"
                    y="6"
                    width="10"
                    height="10"
                    rx="2"
                    stroke="#a67c00"
                    strokeWidth="1.5"
                    fill="#fffbe7"
                  />
                  <rect
                    x="8"
                    y="4"
                    width="7"
                    height="7"
                    rx="1.2"
                    stroke="#a67c00"
                    strokeWidth="1"
                    fill="#fffbe7"
                  />
                </svg>
              </button>
              {copySuccess && <span className="offers-copied">Copied!</span>}
            </span>
            <br />
            <span style={{color:"#008a10"}}>Use this coupon when you place your order in the cart page to get 20% OFF!</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default Offers;