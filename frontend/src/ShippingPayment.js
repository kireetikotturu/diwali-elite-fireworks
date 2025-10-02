import React from "react";
import "./Footer.css"; // reuse footer styles for layout consistency

function ShippingPayment() {
  return (
    <div className="footer-policy-page">
      <h2 className="footer-policy-title">Shipping & Payment Policy</h2>
      <div className="footer-policy-content">
        <p>
          We offer shipping on all eligible orders. Payments can be made via Cash on Delivery or other available options. Please review our full shipping and payment policies before purchase. Contact us for any queries regarding delivery or payment.
        </p>
        {/* Add more policy details as needed */}
      </div>
    </div>
  );
}

export default ShippingPayment;