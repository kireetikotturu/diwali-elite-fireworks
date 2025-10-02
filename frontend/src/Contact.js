import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Send contact form data to backend/email
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      alert("Please fill all fields!");
      return;
    }
    setSending(true);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: "CONTACT-" + Math.floor(Math.random() * 10000),
          name: form.name,
          phone: form.phone,
          address: "Contact Form Submission",
          pincode: "",
          deliveryDate: "",
          cart: [],
          total: "",
          message: form.message
        })
      });
      setSent(true);
      confetti({
        particleCount: 60,
        spread: 45,
        origin: { y: 0.6 },
        colors: ["#c47c00", "#f6e7b2"],
        scalar: 0.8,
        ticks: 120,
      });
    } catch (err) {
      alert("Failed to send. Please try again.");
    }
    setSending(false);
  };

  return (
    <div className="contact-root">
      {/* Brand history/intro */}
      <div className="contact-brand-card">
        <h1 className="contact-brand-title">Contact Elite Fireworks Team</h1>
        <div className="contact-brand-desc">
          <b>Elite Fireworks</b> has been a trusted name for <span style={{color:"#c47c00"}}>5+ years</span>, providing top-quality crackers to thousands of happy customers.<br />
          After years of success in offline sales, we now bring our festive joy online—making it easier, safer, and more convenient for you to order crackers from anywhere!
        </div>
      </div>

      {/* WhatsApp, Email, Phone */}
      <div className="contact-links-section">
        <div className="contact-link-row">
          <a
            href="https://wa.me/917989919952"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link whatsapp"
          >
            <img src="/whatsapplogo.svg" alt="WhatsApp" className="contact-link-icon" />
            WhatsApp Chat
          </a>
          <a
            href="mailto:venombar122@gmail.com?subject=Elite%20Fireworks%20Online%20Enquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link email"
          >
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="contact-link-icon">
              <rect x="3" y="8" width="26" height="16" rx="4" fill="#fffbe7" stroke="#c47c00" strokeWidth="2"/>
              <path d="M5 10l11 9 11-9" stroke="#e040fb" strokeWidth="2" fill="none"/>
            </svg>
            Email Us
          </a>
        </div>
        <div className="contact-phone-row">
          <span className="contact-phone-label">Call us:</span>
          <a href="tel:+917989919952" className="contact-phone-number">+91 79899 19952</a>
        </div>
      </div>

      {/* Office Address */}
      <div className="contact-office-section">
        <div className="contact-office-title">Our Brand New Office</div>
        <div className="contact-office-address">
          H.No. 409-14/29,<br />
          Bapu Nagar, Chinthal,<br />
          Hyderabad, Telangana 500054
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form-section">
        <div className="contact-form-title">
          Reach out to us—fill this form and we'll get back to you within a couple of minutes!
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="contact-label">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleForm}
            placeholder="Your Name"
            required
            className="contact-input"
            disabled={sent}
          />
          <label htmlFor="phone" className="contact-label">Mobile Number</label>
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
            pattern="[0-9]{10}"
            className="contact-input"
            disabled={sent}
          />
          <label htmlFor="message" className="contact-label">Your Message</label>
          <textarea
            name="message"
            id="message"
            value={form.message}
            onChange={handleForm}
            placeholder="How can we help you?"
            required
            className="contact-textarea"
            disabled={sent}
          />
          <button
            type="submit"
            className="contact-form-btn"
            disabled={sending || sent}
          >
            {sending ? "Sending..." : sent ? "Sent!" : "Send Message"}
          </button>
          {sent && (
            <div className="contact-form-success">
              Thank you for reaching out! We'll contact you soon.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;