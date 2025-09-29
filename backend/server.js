require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Coupon POST endpoint
app.post("/api/coupons", async (req, res) => {
  const { phone } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail (venombar122@gmail.com)
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  await transporter.sendMail({
    from: `Diwali Elite Fireworks <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "New Coupon Request",
    text: `User requested coupon: ${phone}`,
    html: `<p>User requested coupon: <strong>${phone}</strong></p>`,
  });

  res.json({ success: true });
});

// Order POST endpoint
app.post("/api/order", async (req, res) => {
  const { orderId, name, phone, address, pincode, deliveryDate, cart, total } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail (venombar122@gmail.com)
      pass: process.env.EMAIL_PASS, // Your Gmail App Password
    },
  });

  const cartItems = cart.map(
    item => `<li>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</li>`
  ).join("");

  await transporter.sendMail({
    from: `Diwali Elite Fireworks <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
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
    `,
  });

  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));