import React from "react";

function Offers() {
  return (
    <div style={{
      padding: "2rem",
      textAlign: "center",
      background: "linear-gradient(120deg, #ffe082 60%, #e040fb 100%)",
      minHeight: "70vh",
      borderRadius: "18px",
      boxShadow: "0 4px 22px #ffd70044",
      margin: "2rem auto",
      maxWidth: "850px"
    }}>
      <h2 style={{ color: "#d2691e", fontSize: "2.1rem", marginBottom: "1rem" }}>
        🎉 Diwali Special Offers 🎉
      </h2>
      <p style={{ fontSize: "1.18rem", color: "#7a4d00", marginBottom: "1.2rem" }}>
        Save big on combo packs, new arrivals, and festival bundles.<br/>
        <span style={{ color: "#e040fb", fontWeight: "bold" }}>20% OFF</span> with coupon <b>DIWALI0690</b>!
      </p>
      <ul style={{ fontSize: "1.13rem", color: "#d2691e", listStyle: "none", padding: 0 }}>
        <li>🌟 Buy 3 Get 1 Free on Sparklers</li>
        <li>🔥 Flat ₹500 OFF on orders above ₹2000</li>
        <li>🎆 Free Delivery for Elite Fancy Series</li>
        <li>💥 New Arrivals: Extra 10% OFF</li>
      </ul>
      <p style={{ marginTop: "2rem", fontSize: "1.05rem", color: "#7a4d00" }}>
        Hurry! Offers valid till Diwali night.
      </p>
    </div>
  );
}

export default Offers;