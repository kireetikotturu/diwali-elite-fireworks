require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Resend } = require("resend");

const app = express();

// Restrict CORS to your Netlify frontend for security
app.use(cors({
  origin: ["https://diwali-elite-fireworks.netlify.app"],
  methods: ["GET", "POST"]
}));

app.use(bodyParser.json());

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Coupon POST endpoint
app.post("/api/coupons", async (req, res) => {
  const { phone } = req.body;

  try {
    await resend.emails.send({
      from: 'Diwali Elite Fireworks <onboarding@resend.dev>', // You can change this after verifying your domain with Resend
      to: 'venombar122@gmail.com',
      subject: 'New Coupon Request',
      html: `<p>User requested coupon: <strong>${phone}</strong></p>`
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Order POST endpoint
app.post("/api/order", async (req, res) => {
  const { orderId, name, phone, address, pincode, deliveryDate, cart, total } = req.body;

  const cartItems = cart.map(
    item => `<li>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</li>`
  ).join("");

  try {
    await resend.emails.send({
      from: 'Diwali Elite Fireworks <onboarding@resend.dev>',
      to: 'venombar122@gmail.com',
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
    res.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));