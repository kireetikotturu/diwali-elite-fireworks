import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "./Cart.css";

function generateOrderId() {

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const dateStr =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  return `ORD-${randomNum}-${dateStr}`;
}

function getNextDeliveryDates() {
  const dates = [];
  const today = new Date();
  for (let i = 5; i < 12; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().slice(0, 10));
  }
  return dates;
}

function Checkout({ cart, setCart }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Get price info from Cart page navigation
  const {
    couponApplied = false,
    discount = 0,
    subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    total = subtotal
  } = location.state || {};

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    deliveryDate: getNextDeliveryDates()[0],
  });
  const [loadingOrder, setLoadingOrder] = useState(false);

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Per-item discount calculation
  const getItemDiscount = (item) =>
    couponApplied ? Math.round(item.price * item.qty * 0.2) : 0;
  const getItemNewPrice = (item) =>
    couponApplied
      ? item.price * item.qty - getItemDiscount(item)
      : item.price * item.qty;

  // NAVIGATE to /thankyou after order placed!
  const handleOrder = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.pincode || !form.deliveryDate) {
      alert("Please fill all fields!");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setLoadingOrder(true);
    const generatedOrderId = generateOrderId();

    // Fire API call in background, but show success page after 2 seconds
    fetch(`${process.env.REACT_APP_API_URL}/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: generatedOrderId,
        name: form.name,
        phone: form.phone,
        address: form.address,
        pincode: form.pincode,
        deliveryDate: form.deliveryDate,
        cart,
        total
      })
    }).catch(() => {});

    setTimeout(() => {
      setLoadingOrder(false);
      setCart([]);
      localStorage.removeItem("cart");
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#ffd700", "#c47c00", "#e040fb"],
        scalar: 1.1,
        ticks: 140
      });
      // Go to Thank You page with data
      navigate("/thankyou", {
        state: {
          orderId: generatedOrderId,
          name: form.name,
          phone: form.phone,
          address: form.address,
          pincode: form.pincode,
          deliveryDate: form.deliveryDate,
          orderTotal: total
        }
      });
    }, 2000); // Show success in 2 seconds, regardless of email sending
  };

  if (loadingOrder) {
    return (
      <div className="cart-root">
        <div className="cart-loading-bar-wrap">
          <div className="cart-loading-bar">
            <div className="cart-loading-inner"></div>
          </div>
          <div className="cart-loading-text">Placing your order...</div>
        </div>
      </div>
    );
  }

  // Modern, premium empty cart UX
  if (!cart || cart.length === 0) {
    return (
      <div className="cart-root cart-empty-root">
        <div className="checkout-empty-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Empty Cart"
            className="checkout-empty-img"
          />
          <div className="checkout-empty-title">Your cart is empty</div>
          <div className="checkout-empty-desc">
            Looks like you haven't added anything yet.<br />
            Start shopping and fill your cart with happiness!
          </div>
          <a href="/shop" className="checkout-shop-btn">
            Shop Now
          </a>
        </div>
      </div>
    );
  }

  // Horizontal product alignment for checkout, with discount info
  return (
    <div className="cart-root">
      <h2 className="cart-title">Checkout</h2>
      <table className="cart-table checkout-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>
                <div className="checkout-product-row">
                  <img src={item.image} alt={item.name} className="cart-img" />
                  <span className="cart-name">{item.name}</span>
                </div>
              </td>
              <td>{item.qty}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
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
      <form onSubmit={handleOrder} className="cart-form">
        <label className="cart-label" htmlFor="name">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={form.name}
          onChange={handleForm}
          placeholder="Full Name"
          required
          className="cart-input"
        />
        <label className="cart-label" htmlFor="phone">Mobile Number</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={form.phone}
          onChange={handleForm}
          placeholder="Mobile Number"
          required
          minLength={10}
          maxLength={10}
          className="cart-input"
        />
        <label className="cart-label" htmlFor="address">Delivery Address</label>
        <textarea
          name="address"
          id="address"
          value={form.address}
          onChange={handleForm}
          placeholder="Delivery Address (include house no, street, etc)"
          required
          className="cart-textarea"
        />
        <label className="cart-label" htmlFor="pincode">Pincode</label>
        <input
          type="text"
          name="pincode"
          id="pincode"
          value={form.pincode}
          onChange={handleForm}
          placeholder="Pincode"
          required
          minLength={6}
          maxLength={6}
          className="cart-input"
        />
        <label className="cart-label" htmlFor="deliveryDate">
          Select Delivery Date:
          <select
            name="deliveryDate"
            id="deliveryDate"
            value={form.deliveryDate}
            onChange={handleForm}
            className="cart-select"
          >
            {getNextDeliveryDates().map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </label>
        <div className="cart-pay-mode">
          Payment Mode: <span>Cash on Delivery</span>
        </div>
        <button type="submit" className="cart-order-btn">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;