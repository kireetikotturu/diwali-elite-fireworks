import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "./Cart.css";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
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
    if (coupon.trim().toUpperCase() === "DIWALI0690") {
      setCouponApplied(true);
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
    } else {
      alert("Invalid coupon code!");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.2) : 0;
  const total = subtotal - discount;

  // Calculate per-item discount and price
  const getItemDiscount = (item) =>
    couponApplied ? Math.round(item.price * item.qty * 0.2) : 0;
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

  return (
    <div className="cart-root">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="cart-empty">
          Your cart is empty. <br /> <a href="/shop" className="cart-shop-link">Shop Now</a>
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
                    <td class="td-button-container">
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
                20% OFF applied! 🎉
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