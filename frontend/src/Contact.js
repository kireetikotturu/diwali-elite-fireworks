import React from "react";

function Contact() {
  // For now, just a simple contact info
  return (
    <div style={{
      padding: "2rem",
      textAlign: "center",
      background: "linear-gradient(120deg, #e040fb 60%, #ffd700 100%)",
      minHeight: "70vh",
      borderRadius: "18px",
      boxShadow: "0 4px 22px #ffd70044",
      margin: "2rem auto",
      maxWidth: "850px"
    }}>
      <h2 style={{ color: "#d2691e", fontSize: "2.1rem", marginBottom: "1rem" }}>
        Contact Us
      </h2>
      <p style={{ fontSize: "1.19rem", color: "#7a4d00", marginBottom: "1.5rem" }}>
        Have a question or want to order? <br/>
        Reach out—we’re happy to help!
      </p>
      <div style={{ fontSize: "1.13rem", color: "#e040fb", marginBottom: "1rem" }}>
        <b>WhatsApp:</b>{" "}
        <a
          href="https://wa.me/917989919952?text=Hi%2C%20I%20just%20visited%20your%20Diwali%20Elite%20Fireworks%20website%20and%20would%20like%20to%20know%20more%20information."
          style={{ color: "#e040fb", textDecoration: "underline" }}
          target="_blank" rel="noopener noreferrer"
        >
          +91 7989919952
        </a>
      </div>
      <div style={{ fontSize: "1.13rem", color: "#d2691e", marginBottom: "1rem" }}>
        <b>Email:</b>{" "}
        <a
          href="mailto:kireetikotturu@gmail.com"
          style={{ color: "#d2691e", textDecoration: "underline" }}
          target="_blank" rel="noopener noreferrer"
        >
          kireetikotturu@gmail.com
        </a>
      </div>
      <p style={{ marginTop: "2rem", fontSize: "1.05rem", color: "#7a4d00" }}>
        Or use the form below (coming soon)!
      </p>
    </div>
  );
}

export default Contact;