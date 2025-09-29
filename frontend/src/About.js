import React from "react";

function About() {
  return (
    <div style={{
      padding: "2rem",
      textAlign: "center",
      background: "linear-gradient(120deg, #ffd700 60%, #ff9800 100%)",
      minHeight: "70vh",
      borderRadius: "18px",
      boxShadow: "0 4px 22px #ffd70044",
      margin: "2rem auto",
      maxWidth: "850px"
    }}>
      <h2 style={{ color: "#e040fb", fontSize: "2.1rem", marginBottom: "1rem" }}>
        About Diwali Elite Fireworks
      </h2>
      <p style={{ fontSize: "1.19rem", color: "#7a4d00", marginBottom: "1.5rem" }}>
        For over <b>5 years</b>, our family-run store has brought light and joy to Diwali celebrations in our community.<br/>
        Now, we’re bringing the Elite experience online—so you can enjoy high-quality, safe, and exciting fireworks delivered to your doorstep!
      </p>
      <ul style={{ fontSize: "1.07rem", color: "#d2691e", listStyle: "none", padding: 0 }}>
        <li>💫 Trust: 1000+ happy families served</li>
        <li>🚚 Cash on Delivery & Fast Delivery</li>
        <li>🎆 Only branded, certified products</li>
        <li>🌟 Exclusive discounts & instant coupons</li>
      </ul>
      <p style={{ marginTop: "2rem", fontSize: "1.05rem", color: "#7a4d00" }}>
        Celebrate safely. Celebrate with Elite!
      </p>
    </div>
  );
}

export default About;