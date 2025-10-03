import React from "react";
import "./Terms.css"; // Use dedicated styles for pro classic look

function Terms() {
  return (
    <div className="terms-root">
      <h1 className="terms-title">Terms & Conditions</h1>
      <div className="terms-section">
        <div className="terms-section-title">General Usage</div>
        <div className="terms-content">
          The website is owned, operated, and monitored by <b>Elite Crackers Online</b>. This site is intended for personal use only and not for commercial purposes. By using this site, you agree to follow all stated conditions. If you disagree with any part of these terms, please discontinue use of the website.
        </div>
      </div>
      <div className="terms-section">
        <div className="terms-section-title">Modification of Terms</div>
        <div className="terms-content">
          We reserve the right to update or modify these terms and conditions at any time. Please review them each time you use the website.
        </div>
      </div>
      <div className="terms-section">
        <div className="terms-section-title">Order Placement</div>
        <ul className="terms-list">
          <li>We accept online orders only from Tamil Nadu; minimum order value is <b>₹2000</b>.</li>
          <li>Orders are not accepted for locations where crackers are banned.</li>
          <li>Upon submitting an order, our team will respond within 24 hours.</li>
        </ul>
      </div>
      <div className="terms-section">
        <div className="terms-section-title">Payment Policies</div>
        <ul className="terms-list">
          <li>Orders are shipped only after full payment is received.</li>
          <li>Prices include packaging and taxes.</li>
          <li>Pricing is subject to change at any time at our discretion.</li>
          <li>Digital copies of your order and payment details will be emailed after checkout.</li>
        </ul>
      </div>
      <div className="terms-section">
        <div className="terms-section-title">Cancellation & Refund Policy</div>
        <ul className="terms-list">
          <li>15% cancellation fee applies to confirmed orders canceled after packing; 85% of the amount will be refunded.</li>
          <li>Delivery charges are non-refundable in case of cancellation.</li>
        </ul>
      </div>
      <div className="terms-section">
        <div className="terms-section-title">Shipping & Delivery Policies</div>
        <ul className="terms-list">
          <li>Free doorstep delivery for orders over <b>₹10,000</b> (via nearest parcel service).</li>
          <li>Orders are processed by our team; delivery is handled by third-party agencies.</li>
          <li>Delivery charges apply to each gift box order.</li>
          <li>We are not responsible for damages or missing items during transportation; we ensure products are safely packed in special cartons.</li>
        </ul>
      </div>
      <div className="terms-section">
        <div className="terms-section-title">Disclaimer Notes</div>
        <ul className="terms-list">
          <li>Prices displayed on the website are for reference only.</li>
          <li>A representative will contact you within 24 hours of submitting an enquiry.</li>
          <li>Product images are for reference only; final delivered products may differ in appearance and packaging.</li>
        </ul>
      </div>
      <div className="terms-footer-note">
        <b>Have questions?</b> <a href="/contact" className="terms-contact-link">Contact our support team</a> for more information about our policies.
      </div>
    </div>
  );
}

export default Terms;