import React, { useState, useRef, useEffect } from "react";
import "./Shop.css";

// Local images for categories and products in public/ directory
const categories = [
  { name: "Sparklers", image: "/category-image1.jpg" },
  { name: "Wheels/Buchakkar", image: "/category-image2.png" },
  { name: "Flower Pots", image: "/category-image3.png" },
  { name: "Threads/Pencils", image: "/category-image4.png" },
  { name: "ROCKETS", image: "/category-image5.png" },
  { name: "Bombs", image: "/category-image6.png" },
  { name: "Lal Mirchi (Per Bundle)", image: "/category-image7.png" },
  { name: "Mirchi Packets", image: "/category-image8.png" },
  { name: "Elite Fancy Series", image: "/category-image9.png" },
  { name: "SHORTS", image: "/category-image10.png" },
  { name: "Garland Crackers", image: "/category-image11.png" },
  { name: "Others", image: "/category-image12.png" },
  { name: "Combo Offers", image: "/category-image13.jpg" }
];

const products = [
  {
    id: 1,
    name: "75CM ELECTRIC\n(Box: 10PCS)",
    price: 322,
    actualPrice: 500,
    image: "/product-image1.png",
    category: "Sparklers",
    offer: "-36% OFF"
  },
  {
    id: 2,
    name: "30CM ELECTRIC\n(Box: 10PCS)",
    price: 58,
    actualPrice: 100,
    image: "/product-image2.png",
    category: "Sparklers",
    offer: "-42% OFF"
  },
  {
    id: 3,
    name: "30CM CRACKLING\n(Box: 10PCS)",
    price: 62,
    actualPrice: 120,
    image: "/product-image3.png",
    category: "Sparklers",
    offer: "-49% OFF"
  },
  {
    id: 4,
    name: "15CM RED\n(Box: 10PCS)",
    price: 81,
    actualPrice: 100,
    image: "/product-image4.png",
    category: "Sparklers",
    offer: "-19% OFF"
  },
  {
    id: 5,
    name: "15CM ELECTRIC\n(Box: 10PCS)",
    price: 69,
    actualPrice: 100,
    image: "/product-image5.png",
    category: "Sparklers",
    offer: "-31% OFF"
  },
  {
    id: 6,
    name: "12CM CRACKLING\n(Box: 10PCS)",
    price: 48,
    actualPrice: 80,
    image: "/product-image6.png",
    category: "Sparklers",
    offer: "-40% OFF"
  },
  {
    id: 7,
    name: "10CM ELECTRIC\n(Box: 10PCS)",
    price: 46,
    actualPrice: 70,
    image: "/product-image7.png",
    category: "Sparklers",
    offer: "-35% OFF"
  },
  {
    id: 8,
    name: "7CM CRACKLING\n(Box: 10PCS)",
    price: 35,
    actualPrice: 60,
    image: "/product-image8.png",
    category: "Sparklers",
    offer: "-41% OFF"
  }
];

function Shop({ cart, setCart }) {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || null;
  });
  const [addedId, setAddedId] = useState(null);
  const addedTimeoutRef = useRef(null);

  // Persist selected category
  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem("selectedCategory", selectedCategory);
    } else {
      localStorage.removeItem("selectedCategory");
    }
  }, [selectedCategory]);

  // ✅ Handle hardware back button: go back to categories instead of home
  useEffect(() => {
    const handleBack = (event) => {
      if (selectedCategory) {
        event.preventDefault();
        setSelectedCategory(null);
        window.history.pushState(null, ""); // stay on same page
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);
      }
    };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [selectedCategory]);

  // Always scroll to top when switching to product view or back to categories
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    window.history.pushState({ category: catName }, "");
    setTimeout(scrollToTop, 0);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setTimeout(scrollToTop, 0);
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setAddedId(product.id);
    if (addedTimeoutRef.current) clearTimeout(addedTimeoutRef.current);
    addedTimeoutRef.current = setTimeout(() => setAddedId(null), 700);
  };

  // Filter products by selected category
  const filteredProducts = products
    .filter((product) => product.category === selectedCategory)
    .slice(0, 20);

  return (
    <div className="shop-root">
      {!selectedCategory ? (
        <>
          <h2 className="shop-title">Shop by Product</h2>
          <div className="category-cards-list">
            {categories.map((cat, idx) => (
              <div
                className="category-card"
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                tabIndex={0}
                role="button"
                aria-label={`View ${cat.name}`}
              >
                <div className="category-img-wrap">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-card-img"
                    onError={e => { e.target.src = "/category-image1.png"; }}
                  />
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
                    <path
                      d="M9 8l4 4-4 4"
                      stroke="#6342a7"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="shop-header-flex">
            <button
              className="category-back-btn"
              onClick={handleBackToCategories}
            >
              ← Back to Categories
            </button>
            <h2 className="shop-title">{selectedCategory}</h2>
          </div>
          <div className="shop-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => (
                <div className="shop-item shop-square-card" key={product.id}>
                  <span className="shop-offer-badge">{product.offer}</span>
                  <div className="shop-img-wrap-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="shop-item-img-square"
                      onError={e => { e.target.src = "/product-image1.png"; }}
                    />
                  </div>
                  <div className="shop-item-details">
                    <h3 className="shop-item-name">{product.name}</h3>
                    <div className="shop-item-prices">
                      <span className="shop-item-actualprice">
                        ₹{product.actualPrice}
                      </span>
                      <span className="shop-item-price">₹{product.price}</span>
                    </div>
                    <button
                      className={`shop-item-add${
                        addedId === product.id ? " added" : ""
                      }`}
                      onClick={() => addToCart(product)}
                    >
                      {addedId === product.id ? "Added!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "#6342a7",
                  paddingTop: "2rem",
                }}
              >
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