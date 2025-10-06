require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Resend } = require("resend");

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

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Coupon POST endpoint
app.post("/api/coupons", async (req, res) => {
  console.log("Coupon request received:", req.body);
  const { phone } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'Diwali Elite Fireworks <onboarding@resend.dev>', // Default Resend sender
      to: 'elitefireworksindia@gmail.com',
      subject: 'New Coupon Request',
      html: `<p>User requested coupon: <strong>${phone}</strong></p>`
    });
    console.log("Resend API response [Coupon]:", response);
    res.json({ success: true });
  } catch (error) {
    console.error("Email send error [Coupon]:", error);
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
    const response = await resend.emails.send({
      from: 'Diwali Elite Fireworks <onboarding@resend.dev>',
      to: 'elitefireworksindia@gmail.com',
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
    console.log("Resend API response [Order]:", response);
    res.json({ success: true });
  } catch (error) {
    console.error("Email send error [Order]:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Contact POST endpoint
app.post("/api/contact", async (req, res) => {
  console.log("Contact request received:", req.body);
  const { name, phone, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'Diwali Elite Fireworks <onboarding@resend.dev>',
      to: 'elitefireworksindia@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });
    console.log("Resend API response [Contact]:", response);
    res.json({ success: true });
  } catch (error) {
    console.error("Email send error [Contact]:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));