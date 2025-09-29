import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Cart.css";

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    orderId = "",
    name = "",
    phone = "",
    address = "",
    pincode = "",
    deliveryDate = "",
    orderTotal = "",
  } = location.state || {};

  const [copySuccess, setCopySuccess] = React.useState(false);

  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1200);
    }
  };

  const whatsappMsg = encodeURIComponent(
    `When can I expect my order delivery or can I get info about order tracking?\n\nOrder ID: ${orderId}\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nPincode: ${pincode}\nDelivery Date: ${deliveryDate}\nOrder Total: ₹${orderTotal}\nThank you!`
  );

  return (
    <div className="cart-root">
      <div className="cart-thankyou-page">
        <div className="cart-orderid-row">
          <span className="cart-orderid-label">Order ID:</span>
          <span className="cart-orderid-value">{orderId}</span>
          <button
            className="cart-orderid-copybtn"
            onClick={handleCopyOrderId}
            title="Copy Order ID"
            tabIndex={0}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect x="5" y="6" width="10" height="10" rx="2" stroke="#a67c00" strokeWidth="1.5" fill="#fffbe7"/>
              <rect x="8" y="4" width="7" height="7" rx="1.2" stroke="#a67c00" strokeWidth="1" fill="#fffbe7"/>
            </svg>
          </button>
          {copySuccess && <span className="cart-orderid-copied">Copied!</span>}
        </div>
        <div className="cart-orderid-info">
          <span>⚠️ Please save your Order ID for future queries.</span>
        </div>
        <h2 className="cart-thankyou-title">🎉 Thank you for your order!</h2>
        <div className="cart-happydiwali-highlight">Happy Diwali!</div>
        <p className="cart-thankyou-msg">
          Your order has been placed successfully.<br />
          We’ll connect with you soon.<br /><br />
          <span className="cart-thankyou-trackinfo">
            For any queries regarding delivery or tracking, click the WhatsApp button below.
          </span>
        </p>
        <div className="cart-thankyou-btns">
          <button className="cart-thankyou-home" onClick={() => navigate("/")}>
            Home
          </button>
          <a
            href={`https://wa.me/917989919952?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cart-thankyou-whatsapp"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;