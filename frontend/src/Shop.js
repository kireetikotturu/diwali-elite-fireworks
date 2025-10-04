import React, { useState, useRef, useEffect } from "react";
import "./Shop.css";

// Cloudinary images for categories and products
const categories = [
  { name: "Sparklers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759383446/sparklers-c-image_oyw1st.jpg" },
  { name: "Wheels/Buchakkar", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759386052/bhuchakkar-c-image_vaxxqi.png" },
  { name: "Flower Pots", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759385749/flowerpot-c-image_poai45.png" },
  { name: "Threads/Pencils", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759401227/Untitled_design_3_larfnm.png" },
  { name: "ROCKETS", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759396971/rockets-c-image_hgzqvd.png" },
  { name: "Bombs", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759388414/bomb-c-image_x9scey.png" },
  { name: "Lal Mirchi (Per Bundle)", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759391010/lalmirchi-c-image_qurouc.png" },
  { name: "Mirchi Packets", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759395609/mirchi-packets-image_qyvad3.jpg" },
  { name: "Elite Fancy Series", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759386943/elitefancy-c-image_t2trdy.png" },
  { name: "SHORTS", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759397199/shorts-c-image_vwv2ji.png" },
  { name: "Garland Crackers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759398165/Untitled_design_1_hrp6wk.png" },
  { name: "Others", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759398909/Untitled_design_2_sd53ui.png" },
  { name: "Combo Offers", image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759057865/elitefancyseries_image1_gsw3ay.jpg" }
];

const products = [
  {
    id: 1,
    name: "75CM ELECTRIC\n(Box: 10PCS)",
    price: 322,
    actualPrice: 500,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759546058/30CM_LONG_1080_x_900_px_12_nynve7.png",
    category: "Sparklers",
    offer: "-36% OFF"
  },
  {
    id: 2,
    name: "30CM ELECTRIC\n(Box: 10PCS)",
    price: 58,
    actualPrice: 100,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759543420/30CM_LONG_1080_x_900_px_4_am0r2w.png",
    category: "Sparklers",
    offer: "-42% OFF"
  },
  {
    id: 3,
    name: "30CM CRACKLING\n(Box: 10PCS)",
    price: 62,
    actualPrice: 120,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759544350/30CM_LONG_1080_x_900_px_6_vvxdmb.png",
    category: "Sparklers",
    offer: "-49% OFF"
  },
  {
    id: 4,
    name: "15CM RED\n(Box: 10PCS)",
    price: 81,
    actualPrice: 100,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759545487/30CM_LONG_1080_x_900_px_7_fswq2c.png",
    category: "Sparklers",
    offer: "-19% OFF"
  },
  {
    id: 5,
    name: "15CM ELECTRIC\n(Box: 10PCS)",
    price: 69,
    actualPrice: 100,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759545486/30CM_LONG_1080_x_900_px_8_r7efhh.png",
    category: "Sparklers",
    offer: "-31% OFF"
  },
  {
    id: 6,
    name: "12CM CRACKLING\n(Box: 10PCS)",
    price: 48,
    actualPrice: 80,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759545487/30CM_LONG_1080_x_900_px_9_knyhf8.png",
    category: "Sparklers",
    offer: "-40% OFF"
  },
  {
    id: 7,
    name: "10CM ELECTRIC\n(Box: 10PCS)",
    price: 46,
    actualPrice: 70,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759545486/30CM_LONG_1080_x_900_px_10_dmzqx5.png",
    category: "Sparklers",
    offer: "-35% OFF"
  },
  {
    id: 8,
    name: "7CM CRACKLING\n(Box: 10PCS)",
    price: 35,
    actualPrice: 60,
    image: "https://res.cloudinary.com/dlz2pxovx/image/upload/v1759545485/30CM_LONG_1080_x_900_px_11_zyyhgo.png",
    category: "Sparklers",
    offer: "-41% OFF"
  }
];

const PROGRESS_COLOR = "#ffd700";

function Shop({ cart, setCart }) {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || null;
  });
  const [addedId, setAddedId] = useState(null);
  const addedTimeoutRef = useRef(null);

  // Loader state
  const [loadingImages, setLoadingImages] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  // Preload images for categories and products (initial load and on category change)
  useEffect(() => {
    let isMounted = true;
    async function loadImages(srcArr) {
      setLoadingImages(true);
      setProgress(0);
      let loadedCount = 0;
      await Promise.all(
        srcArr.map((src) => {
          return new Promise((resolve) => {
            const img = new window.Image();
            img.onload = img.onerror = () => {
              loadedCount += 1;
              if (isMounted)
                setProgress(Math.round((loadedCount / srcArr.length) * 100));
              resolve();
            };
            if ("decode" in img) {
              img.src = src;
              img.decode().then(resolve).catch(resolve);
            } else {
              img.src = src;
            }
          });
        })
      );
      if (isMounted) {
        setProgress(100);
        setTimeout(() => {
          setLoadingImages(false);
          setFadeIn(true);
          setTimeout(() => setFadeIn(false), 700);
        }, 340);
      }
    }

    // On initial load: preload all
    if (selectedCategory === null) {
      loadImages([
        ...categories.map((cat) => cat.image),
        ...products.map((prod) => prod.image)
      ]);
    } else {
      // On category select: preload only product images of that category
      const catSrcs = products
        .filter((product) => product.category === selectedCategory)
        .map((prod) => prod.image);
      loadImages(catSrcs);
    }

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

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
        setFadeIn(true);
        setTimeout(() => setFadeIn(false), 700);
        window.history.pushState(null, "");
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
    setFadeIn(true);
    setTimeout(() => setFadeIn(false), 700);
    window.history.pushState({ category: catName }, "");
    setTimeout(scrollToTop, 0);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setFadeIn(true);
    setTimeout(() => setFadeIn(false), 700);
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

  // Loader component (progress bar at top, spinner, and firework animation)
  const ShopLoader = () => (
    <div className="shop-loader-root">
      <div className="shop-loader-bar-bg">
        <div
          className="shop-loader-bar"
          style={{
            width: `${progress}%`,
            background: PROGRESS_COLOR,
          }}
        />
      </div>
      <div className="shop-loader-spinner"></div>
      <div className="shop-loader-text">
         Loading... {progress}%
      </div>
    </div>
  );

  // Fade-in class for smooth transition
  const fadeClass = fadeIn ? "shop-fade-in" : "";

  if (loadingImages) {
    return <ShopLoader />;
  }

  return (
    <div className={`shop-root ${fadeClass}`}>
      {!selectedCategory ? (
        <>
          <h2 className="shop-title">Shop by Product</h2>
          <div className="category-cards-list">
            {categories.map((cat) => (
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
              filteredProducts.map((product) => (
                <div className="shop-item shop-square-card" key={product.id}>
                  <span className="shop-offer-badge">{product.offer}</span>
                  <div className="shop-img-wrap-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="shop-item-img-square"
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