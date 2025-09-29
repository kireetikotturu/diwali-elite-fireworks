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
import ThankYou from "./ThankYou"; // <--- import the ThankYou page!

function useHideWhatsapp(cart) {
  const location = useLocation();
  if (location.pathname === "/cart" && cart.length === 0) {
    return true;
  }
  return false;
}

function App() {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function AppContent() {
    const hideWhatsapp = useHideWhatsapp(cart);

    return (
      <>
        <Navbar cart={cart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          <Route path="/thankyou" element={<ThankYou />} /> {/* <--- ADD THIS */}
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {!hideWhatsapp && <WhatsappFloat />}
      </>
    );
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;