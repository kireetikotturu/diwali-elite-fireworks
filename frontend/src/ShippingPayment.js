import React from "react";
import "./ShippingPayment.css"; // Use new styles for classic, modern look

function ShippingPayment() {
  return (
    <div className="ship-root">
      <div className="ship-main-card">
        <h1 className="ship-title">Shipping & Payment Policy</h1>
        <div className="ship-intro-card">
          <span className="ship-brand">Elite Fireworks</span> delivers crackers <b>across the Telugu states—Andhra Pradesh and Telangana—seamlessly!</b> We take pride in delivering your crackers and fireworks quickly, safely, and with the utmost care. Please read our shipping and refund policies below for a smooth and transparent shopping experience.
        </div>
      </div>

      <div className="ship-section-card">
        <h2 className="ship-section-title">Shipping & Delivery</h2>
        <ul className="ship-list">
          <li>
            🎁 All orders are packed in premium waterproof cartons to ensure safe delivery.
          </li>
          <li>
            🚚 Once your order and payment are complete, your products are shipped within <b>24–72 hours</b> via trusted parcel services.
          </li>
          <li>
            🕒 We track each order to make sure it reaches you quickly and securely.
          </li>
          <li>
            📦 <b>Tamil Nadu customers</b> must place a minimum order of <b>₹2000</b> (after discounts).
          </li>
          <li>
            💸 <b>Free delivery</b> applies only to orders above <b>₹10,000</b> (after discounts).
          </li>
          <li>
            🚚 For orders under ₹10,000, pickup is required from your nearest courier partner and you must cover the delivery fees.
          </li>
          <li>
            ⏳ Delivery usually takes <b>4–5 working days</b> after your order is placed.
          </li>
          <li>
            🗓️ Public holidays or bandhs may cause minor delivery delays.
          </li>
        </ul>
      </div>

      <div className="ship-section-card">
        <h2 className="ship-section-title">Cancellation & Refunds</h2>
        <ul className="ship-list">
          <li>
            ❌ If you cancel your confirmed order, a <b>15% cancellation fee</b> applies (you’ll receive an 85% refund).
          </li>
          <li>
            🚚 Delivery fees are also non-refundable if an order is canceled.
          </li>
        </ul>
      </div>

      <div className="ship-footer-note">
        <b>Questions?</b> <a href="/contact" className="ship-contact-link">Contact our support team</a> for help with shipping, payment, or delivery.
      </div>
    </div>
  );
}

export default ShippingPayment;