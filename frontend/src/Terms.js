import React from "react";
import "./Footer.css"; // reuse footer styles for layout consistency

function Terms() {
  return (
    <div className="footer-policy-page">
      <h2 className="footer-policy-title">Terms & Conditions</h2>
      <div className="footer-policy-content">
        <p>
          Welcome to Elite Crackers Online. By accessing and using our website, you agree to our terms and conditions. All purchases are subject to our policies regarding payment, shipping, and returns. Please read all terms carefully before placing your order.
        </p>
        {/* Add more policy text as needed */}
      </div>
    </div>
  );
}

export default Terms;