import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "./Cart.css";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponType, setCouponType] = useState(""); // NEW: track which coupon
  const [animCoupon, setAnimCoupon] = useState(false);

  // Quantity change logic
  const handleQtyChange = (id, change) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, qty: Math.max(1, item.qty + change) }
        : item
    ));
  };

  // Remove item logic
  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Coupon logic
  const handleCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "DIWALI0690") {
      setCouponApplied(true);
      setCouponType("20");
      setAnimCoupon(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#ffd700", "#c47c00", "#e040fb"],
        scalar: 1.1,
        ticks: 90
      });
      setTimeout(() => setAnimCoupon(false), 1200);
    } else if (code === "SPECIAL8762") {
      setCouponApplied(true);
      setCouponType("30");
      setAnimCoupon(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#ffd700", "#c47c00", "#e040fb"],
        scalar: 1.25,
        ticks: 120
      });
      setTimeout(() => setAnimCoupon(false), 1400);
    } else {
      alert("Invalid coupon code!");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Updated discount logic
  const discount = couponApplied
    ? couponType === "30"
      ? Math.round(subtotal * 0.3)
      : Math.round(subtotal * 0.2)
    : 0;
  const total = subtotal - discount;

  // Calculate per-item discount and price
  const getItemDiscount = (item) =>
    couponApplied
      ? couponType === "30"
        ? Math.round(item.price * item.qty * 0.3)
        : Math.round(item.price * item.qty * 0.2)
      : 0;
  const getItemNewPrice = (item) =>
    couponApplied
      ? item.price * item.qty - getItemDiscount(item)
      : item.price * item.qty;

  // Pass price info to checkout!
  const handleOrder = () => {
    navigate("/checkout", {
      state: {
        couponApplied,
        discount,
        subtotal,
        total
      }
    });
  };

  // Shop Now button: always go to categories, clear selectedCategory from localStorage
  const handleShopNow = (e) => {
    e.preventDefault();
    localStorage.removeItem("selectedCategory");
    navigate("/shop");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="cart-root">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-content">
            <svg className="cart-empty-icon" width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="27" stroke="#e040fb" strokeWidth="2" fill="#f6e7b2"/>
              <path d="M18 35c1.3-3.6 4.8-6 10-6s8.7 2.4 10 6" stroke="#c47c00" strokeWidth="2.5" strokeLinecap="round"/>
              <ellipse cx="22.5" cy="24" rx="2.5" ry="3" fill="#6342a7"/>
              <ellipse cx="33.5" cy="24" rx="2.5" ry="3" fill="#6342a7"/>
            </svg>
            <div className="cart-empty-text">
              Your cart is empty.
            </div>
            <button
              className="cart-shopnow-btn"
              onClick={handleShopNow}
            >
              <span className="cart-shopnow-icon" role="img" aria-label="Shop">
                🛒
              </span>
              Shop Now
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="cart-table-wrap">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="cart-product">
                        <img src={item.image} alt={item.name} className="cart-img" />
                        <span className="cart-name">{item.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="cart-qty-btns">
                        <button
                          className="cart-qty-btn"
                          aria-label="Decrease"
                          onClick={() => handleQtyChange(item.id, -1)}
                          disabled={item.qty === 1}
                        >-</button>
                        <span className="cart-qty-val">{item.qty}</span>
                        <button
                          className="cart-qty-btn"
                          aria-label="Increase"
                          onClick={() => handleQtyChange(item.id, 1)}
                        >+</button>
                      </div>
                    </td>
                    <td className="cart-price">
                      {couponApplied ? (
                        <>
                          <span className="cart-price-old" style={{ textDecoration: "line-through", color: "#999", fontWeight: 400 }}>
                            ₹{item.price * item.qty}
                          </span>
                          <span className="cart-price-new" style={{ color: "#008a10", fontWeight: "bold", marginLeft: 8 }}>
                            ₹{getItemNewPrice(item)}
                          </span>
                          <span className="cart-item-discount" style={{ color: "#e040fb", marginLeft: 6, fontSize: "0.93em" }}>
                            (-₹{getItemDiscount(item)})
                          </span>
                        </>
                      ) : (
                        <>₹{item.price * item.qty}</>
                      )}
                    </td>
                    <td className="td-button-container">
                      <button className="cart-remove-btn" onClick={() => handleRemove(item.id)}>❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`cart-coupon-section${animCoupon ? " coupon-anim" : ""}`}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              disabled={couponApplied}
              className="cart-coupon-input"
            />
            <button
              onClick={handleCoupon}
              disabled={couponApplied}
              className="cart-coupon-btn"
            >
              {couponApplied ? "Applied!" : "Apply Coupon"}
            </button>
            {couponApplied && (
              <span className="cart-coupon-applied">
                {couponType === "30"
                  ? "30% OFF applied for special member! 🎉"
                  : "20% OFF applied! 🎉"}
              </span>
            )}
          </div>

          <div className="cart-summary">
            <div>
              Subtotal:{" "}
              {couponApplied ? (
                <>
                  <span className="cart-price-old" style={{ textDecoration: "line-through", color: "#999", fontWeight: 400 }}>
                    ₹{subtotal}
                  </span>
                  {" "}
                  <span className="cart-price-new" style={{ color: "#008a10", fontWeight: "bold" }}>
                    ₹{total}
                  </span>
                </>
              ) : (
                <b>₹{subtotal}</b>
              )}
            </div>
            {couponApplied && (
              <div>
                Discount: <b className="cart-discount">-₹{discount}</b>
              </div>
            )}
            <div className="cart-total">
              <b>Total: ₹{total}</b>
            </div>
          </div>

          <button
            className="cart-order-btn"
            onClick={handleOrder}
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            Order Now
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;