require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

// Log that the app has started
console.log("App started, awaiting requests...");

// Restrict CORS to your Netlify frontend and localhost for development
app.use(cors({
  origin: [
    "https://diwali-elite-fireworks.netlify.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST"]
}));

app.use(bodyParser.json());

// Initialize Nodemailer transporter with Gmail and app password from .env
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your gmail address from .env
    pass: process.env.EMAIL_PASS, // your 16-digit app password from .env
  },
});

// Coupon POST endpoint
app.post("/api/coupons", async (req, res) => {
  console.log("Coupon request received:", req.body);
  const { phone } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"Diwali Elite Fireworks" <${process.env.EMAIL_USER}>`,
      to: "elitefireworksindia@gmail.com",
      subject: "New Coupon Request",
      html: `<p>User requested coupon: <strong>${phone}</strong></p>`
    });
    console.log("Nodemailer response [Coupon]:", info);
    res.json({ success: true });
  } catch (error) {
    console.error("Nodemailer send error [Coupon]:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Order POST endpoint
app.post("/api/order", async (req, res) => {
  console.log("Order request received:", req.body);

  const { orderId, name, phone, address, pincode, deliveryDate, cart, total } = req.body;

  const cartItems = cart?.map(
    item => `<li>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</li>`
  ).join("") || "";

  try {
    const info = await transporter.sendMail({
      from: `"Diwali Elite Fireworks" <${process.env.EMAIL_USER}>`,
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
    console.log("Nodemailer response [Order]:", info);
    res.json({ success: true });
  } catch (error) {
    console.error("Nodemailer send error [Order]:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Contact POST endpoint
app.post("/api/contact", async (req, res) => {
  console.log("Contact request received:", req.body);
  const { name, phone, message } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"Diwali Elite Fireworks" <${process.env.EMAIL_USER}>`,
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
    console.log("Nodemailer response [Contact]:", info);
    res.json({ success: true });
  } catch (error) {
    console.error("Nodemailer send error [Contact]:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));