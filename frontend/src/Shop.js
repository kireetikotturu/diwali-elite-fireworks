import React, { useState, useRef, useEffect } from "react";
import "./Shop.css";

const categories = [
  { name: "Ground Crackers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/elitefancyseries_image1_gsw3ay.jpg" },
  { name: "Flower Pot", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/flowerpot_image1_lusjld.jpg" },
  { name: "Fancy Mountains", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/fancymountain_image1_xs6t8x.jpg" },
  { name: "Elite Fancy Series", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/elitefancyseries_image1_gsw3ay.jpg" },
  { name: "Diwali New Arrival", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/flowerpot_image1_lusjld.jpg" },
  { name: "Multiple Sky Shots", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/fancymountain_image1_xs6t8x.jpg" },
  { name: "Aerial Display Pipes", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/elitefancyseries_image1_gsw3ay.jpg" },
  { name: "Twingling Stars", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/flowerpot_image1_lusjld.jpg" },
  { name: "Sparklers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/fancymountain_image1_xs6t8x.jpg" },
  { name: "Colour Matches", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/elitefancyseries_image1_gsw3ay.jpg" },
  { name: "Bomb", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/flowerpot_image1_lusjld.jpg" },
  { name: "Lal Mirchi Crackers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/fancymountain_image1_xs6t8x.jpg" },
  { name: "Lal Deluxe Crackers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/elitefancyseries_image1_gsw3ay.jpg" },
  { name: "Rockets", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/flowerpot_image1_lusjld.jpg" },
  { name: "One Sound Crackers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/fancymountain_image1_xs6t8x.jpg" },
  { name: "Combo Offers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/elitefancyseries_image1_gsw3ay.jpg" }
];

// Four random products, each with actualPrice and discounted price
const products = [
  {
    id: 1,
    name: "Elite Fancy Series",
    price: 100, // discounted price
    actualPrice: 1000, // original price
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/elitefancyseries_image1_gsw3ay.jpg",
    category: "Ground Crackers",
    offer: "-90% OFF"
  },
  {
    id: 2,
    name: "Flower Pot",
    price: 150,
    actualPrice: 950,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/flowerpot_image1_lusjld.jpg",
    category: "Ground Crackers",
    offer: "-90% OFF"
  },
  {
    id: 3,
    name: "Fancy Mountain",
    price: 120,
    actualPrice: 800,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/fancymountain_image1_xs6t8x.jpg",
    category: "Ground Crackers",
    offer: "-85% OFF"
  },
  {
    id: 4,
    name: "Elite Fancy Series",
    price: 180,
    actualPrice: 700,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/elitefancyseries_image1_gsw3ay.jpg",
    category: "Ground Crackers",
    offer: "-75% OFF"
  },
  // Add more products for other categories here if you want them to show up!
];

function Shop({ cart, setCart }) {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || null;
  });
  const [addedId, setAddedId] = useState(null);
  const addedTimeoutRef = useRef(null);

  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem("selectedCategory", selectedCategory);
    } else {
      localStorage.removeItem("selectedCategory");
    }
  }, [selectedCategory]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setAddedId(product.id);
    if (addedTimeoutRef.current) clearTimeout(addedTimeoutRef.current);
    addedTimeoutRef.current = setTimeout(() => setAddedId(null), 700);
  };

  // Filter products by selected category and show only first 4
  const filteredProducts = products
    .filter((product) => product.category === selectedCategory)
    .slice(0, 4);

  return (
    <div className="shop-root">
      {!selectedCategory ? (
        <>
          <h2 className="shop-title">Shop by Product</h2>
          <div className="category-cards-list">
            {categories.map((cat) => (
              <div
                className="category-card"
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                tabIndex={0}
                role="button"
                aria-label={`View ${cat.name}`}
              >
                <div className="category-img-wrap">
                  <img src={cat.image} alt={cat.name} className="category-card-img" />
                </div>
                <span className="category-card-name">{cat.name}</span>
                <button
                  className="category-arrow-btn"
                  tabIndex={-1}
                  aria-hidden={true}
                  type="button"
                  style={{ pointerEvents: "none" }}
                >
                  <svg width="34" height="34" viewBox="0 0 24 24">
                    <path d="M9 8l4 4-4 4" stroke="#6342a7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="shop-header-flex">
            <button className="category-back-btn" onClick={() => setSelectedCategory(null)}>
              ← Back to Categories
            </button>
            <h2 className="shop-title">{selectedCategory}</h2>
          </div>
          <div className="shop-list">
            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
              <div className="shop-item shop-square-card" key={product.id}>
                <span className="shop-offer-badge">{product.offer}</span>
                <div className="shop-img-wrap-square">
                  <img src={product.image} alt={product.name} className="shop-item-img-square" />
                </div>
                <div className="shop-item-details">
                  <h3 className="shop-item-name">{product.name}</h3>
                  <div className="shop-item-prices">
                    <span className="shop-item-actualprice">₹{product.actualPrice}</span>
                    <span className="shop-item-price">₹{product.price}</span>
                  </div>
                  <button
                    className={`shop-item-add${addedId === product.id ? " added" : ""}`}
                    onClick={() => addToCart(product)}
                  >
                    {addedId === product.id ? "Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: "center", color: "#6342a7", paddingTop: "2rem" }}>
                No products available in this category yet.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Shop;