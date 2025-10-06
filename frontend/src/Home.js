import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "./Home.css";

function Home() {

  const [phone, setPhone] = useState(() => localStorage.getItem("userPhone") || "");
  const [showCoupon, setShowCoupon] = useState(() => !!localStorage.getItem("couponCode"));
  const [sending, setSending] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();

  const couponCode = localStorage.getItem("couponCode") || "DIWALI0690";

  // --- Carousel state for MP4 banners ---
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    { src: "/banner1.mp4", alt: "Diwali Banner 1" },
    { src: "/banner2.mp4", alt: "Diwali Banner 2" },
    { src: "/banner3.mp4", alt: "Diwali Banner 3" },
    { src: "/banner4.mp4", alt: "Diwali Banner 4" },
  ];

  // Carousel scroll/pagination state
  const carouselRef = useRef();

  // --- Carousel Auto Scroll ---
  useEffect(() => {
    const interval = setInterval(() => {
      handleBannerChange((currentBanner + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [currentBanner, banners.length]);

  // --- Smooth Carousel Scroll ---
  const handleBannerChange = (idx) => {
    setCurrentBanner(idx);
    if (carouselRef.current) {
      const scrollX = idx * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({ left: scrollX, behavior: "smooth" });
    }
  };

  // --- Touch/swipe support for carousel ---
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          // Swipe left: next banner
          handleBannerChange((currentBanner + 1) % banners.length);
        } else {
          // Swipe right: previous banner
          handleBannerChange((currentBanner - 1 + banners.length) % banners.length);
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // --- Coupon Submit ---
  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      return alert("Please enter a valid mobile number.");
    }

    setSending(true);

    // Save to localStorage for persistence across pages
    localStorage.setItem("userPhone", phone);
    localStorage.setItem("couponCode", couponCode);
    setShowCoupon(true);
    setSending(false);

    // Fire API call in background (don’t block UI)
    fetch(`${process.env.REACT_APP_API_URL}/api/coupons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    }).catch((error) => {
      console.error("Coupon API failed:", error);
    });

    // Confetti celebration
    confetti({
      particleCount: 60,
      spread: 45,
      origin: { y: 0.6 },
      colors: ["#c47c00", "#f6e7b2"],
      scalar: 0.8,
      ticks: 120,
    });
  };

  // Coupon persists until cleared after order (implement this in your order placement logic)
  // Example: localStorage.removeItem("couponCode"); localStorage.removeItem("userPhone");

  // --- Shop Now always goes to Categories page ---
  const handleShopNow = () => {
  navigate("/shop", { state: { resetShop: true } }); // <-- NEW
};

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1300);
  };

  return (
    <div className="home-root">
      {/* --- SCROLLING NOTICE BAR --- */}
      <div className="notice-bar">
        <div className="notice-marquee">
          <span>
            Free and Fast delivery across the Hyderabad city. Buy orders of minimum ₹ 1000 to get more special discounts! Prices vary by
            time, so order immediately if you see a hot deal don't miss out.
          </span>
        </div>
      </div>

      {/* --- SLIDING VIDEO BANNER SECTION --- */}
      <section className="sliding-banner-section">
        <div
          className="banner-carousel"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((banner, idx) => (
            <div
              key={banner.src}
              className="banner-slide"
              style={{
                left: `${idx * 100}%`,
                transform: `translateX(-${currentBanner * 100}%)`,
                transition: "transform 0.5s cubic-bezier(.77,0,.18,1)", // smooth slide
              }}
            >
              <video
                src={banner.src}
                alt={banner.alt}
                className="banner-video"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          ))}
        </div>
        {/* Pagination Dots */}
        {/* <div className="banner-dots">
          {banners.map((_, idx) => (
            <span
              key={idx}
              className={`banner-dot${currentBanner === idx ? " active" : ""}`}
              onClick={() => handleBannerChange(idx)}
            />
          ))}
        </div> */}
      </section>

      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="hero-content">
          <h1 class="brand-head">
            Celebrate Diwali with <span className="brand">Elite Crackers</span>
          </h1>
          <p className="hero-desc">
            A classic way to light up your festival—premium crackers, home
            delivery, special offers.
          </p>
          <div className="hero-btns">
            <button className="cta-btn" onClick={handleShopNow}>
              Shop Now
            </button>
            <a href="/offers" className="cta-btn offers-btn">
              View Offers
            </a>
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
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, ""));
                localStorage.setItem("userPhone", e.target.value.replace(/\D/g, ""));
              }}
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
              ) : showCoupon ? (
                "Sent!"
              ) : (
                "Get Coupon"
              )}
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
                style={{
                  marginLeft: 8,
                  verticalAlign: "middle",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
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
              {copySuccess && <span className="coupon-copied">Copied!</span>}
              <br />
              Use this for 20% OFF in your cart value!
            </div>
          )}
        </div>
      </section>

      {/* --- FESTIVE BANNERS SECTION --- */}
      <section className="festive-banners">
        <div className="banner-card">
          <h3>Limited Time Offer</h3>
          <p>
            Flat 20% OFF on combos. Free delivery on minimum order value ₹1000.
          </p>
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

      {/* --- WhatsApp Floating Button --- */}
      <a
        href="https://wa.me/919876543210"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <img src="/whatsapplogo.svg" alt="WhatsApp" className="whatsapp-logo" />
      </a>
    </div>
  );
}

export default Home;