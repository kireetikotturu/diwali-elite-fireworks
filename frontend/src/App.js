import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";
import Offers from "./Offers";
import About from "./About";
import Contact from "./Contact";
import WhatsappFloat from "./WhatsappFloat";
import Checkout from "./Checkout";
import ThankYou from "./ThankYou";
import Footer from "./Footer";
import Terms from "./Terms";
import ShippingPayment from "./ShippingPayment";

// --- Scroll restoration component ---
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function useHideWhatsapp(cart) {
  const location = useLocation();
  if (location.pathname === "/cart" && cart.length === 0) {
    return true;
  }
  return false;
}

function AppContent({ cart, setCart }) {
  const hideWhatsapp = useHideWhatsapp(cart);

  return (
    <>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shipping" element={<ShippingPayment />} />
      </Routes>
      {!hideWhatsapp && <WhatsappFloat />}
      <Footer />
    </>
  );
}

function App() {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Router>
      <ScrollToTop />
      <AppContent cart={cart} setCart={setCart} />
    </Router>
  );
}

export default App;