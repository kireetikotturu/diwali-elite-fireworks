import React, { useState, useRef, useEffect } from 'react';
import './Carousel.css';

const images = [
  "/bannerimage1.png",
  "/bannerimage2.png"
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const prevSlide = () => setCurrent(current === 0 ? images.length - 1 : current - 1);
  const nextSlide = () => setCurrent((current + 1) % images.length);

  const startX = useRef(null);
  const handleTouchStart = e => { startX.current = e.touches[0].clientX; };
  const handleTouchEnd = e => {
    if (startX.current !== null) {
      const delta = e.changedTouches[0].clientX - startX.current;
      if (delta > 40) prevSlide();
      else if (delta < -40) nextSlide();
      startX.current = null;
    }
  };

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className="carousel-arrow left" onClick={prevSlide} aria-label="Previous">
        <svg width="30" height="30" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fffbe7"/><path d="M18 10l-6 6 6 6" stroke="#d97706" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div className="carousel-slide-wrapper">
        {images.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`Banner ${idx + 1}`}
            className={`carousel-img${idx === current ? " show" : ""}`}
            draggable={false}
          />
        ))}
      </div>
      <button className="carousel-arrow right" onClick={nextSlide} aria-label="Next">
        <svg width="30" height="30" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fffbe7"/><path d="M14 10l6 6-6 6" stroke="#d97706" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div className="carousel-indicators">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={current === idx ? "active" : ""}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;