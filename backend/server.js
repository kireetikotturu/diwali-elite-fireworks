require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Resend } = require("resend");

const app = express();
console.log("App started, awaiting requests...");

// CORS setup
app.use(cors({
  origin: [
    "https://diwali-elite-fireworks.netlify.app", // frontend production URL
    "http://localhost:3000" // local development
  ],
  methods: ["GET", "POST"]
}));

app.use(bodyParser.json());

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to send emails
async function sendEmail({ to, subject, html }) {
  try {
    const email = await resend.emails.send({
      from: `Diwali Elite Fireworks <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log("Resend email sent:", { to, subject });
    return email;
  } catch (error) {
    console.error("Resend send error:", error);
    throw error;
  }
}

// Coupon endpoint
app.post("/api/coupons", async (req, res) => {
  const { phone } = req.body;
  console.log("Coupon request received:", phone);

  try {
    await sendEmail({
      to: "elitefireworksindia@gmail.com",
      subject: "New Coupon Request",
      html: `<p>User requested coupon: <strong>${phone}</strong></p>`
    });
    res.json({ success: true, message: "Coupon request sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Order endpoint
app.post("/api/order", async (req, res) => {
  const { orderId, name, phone, address, pincode, deliveryDate, cart, total } = req.body;
  console.log("Order request received:", orderId);

  const cartItems = cart?.map(
    item => `<li>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</li>`
  ).join("") || "";

  try {
    await sendEmail({
      to: "elitefireworksindia@gmail.com",
      subject: `New Order Received: ${orderId}`,
      html: `
        <h2>New Order Placed</h2>
        <p><b>Order ID:</b> ${orderId}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>Pincode:</b> ${pincode}</p>
        <p><b>Delivery Date:</b> ${deliveryDate}</p>
        <p><b>Total:</b> ₹${total}</p>
        <h3>Items:</h3>
        <ul>${cartItems}</ul>
      `
    });
    res.json({ success: true, message: "Order email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Contact endpoint
app.post("/api/contact", async (req, res) => {
  const { name, phone, message } = req.body;
  console.log("Contact request received:", name);

  try {
    await sendEmail({
      to: "elitefireworksindia@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });
    res.json({ success: true, message: "Contact form email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
