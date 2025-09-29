import React from "react";
import "./WhatsappFloat.css";

const WHATSAPP_URL = `https://wa.me/917989919952?text=${encodeURIComponent(
  "Hi! Can I know more about your fireworks rates and delivery?"
)}`;

function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="whatsapp-float-logo">
        <svg width="60" height="60" viewBox="0 0 42 42" fill="none">
          <circle cx="21" cy="21" r="21" fill="white"/>
          <path d="M21 34c7.18 0 13-5.82 13-13s-5.82-13-13-13-13 5.82-13 13c0 2.06.48 4.09 1.42 5.93L8 34l7.07-1.46A12.98 12.98 0 0021 34z" fill="#25d366"/>
          <path d="M27.33 23.07c-.37-.18-2.18-1.08-2.52-1.2-.34-.12-.59-.18-.84.18-.25.36-.96 1.2-1.18 1.45-.22.25-.43.28-.8.09-.37-.18-1.57-.58-2.99-1.84-1.11-.99-1.86-2.2-2.08-2.57-.22-.37-.02-.57.16-.75.17-.18.37-.46.55-.68.18-.23.23-.39.34-.64.11-.25.05-.48-.02-.66-.07-.18-.84-2.03-1.15-2.78-.3-.72-.59-.63-.8-.64-.2-.01-.43-.01-.66-.01-.23 0-.6.09-.93.44-.33.36-1.26 1.23-1.26 3.01 0 1.78 1.31 3.5 1.49 3.74.18.25 2.58 3.97 6.27 5.41.88.35 1.57.56 2.11.72.89.28 1.7.24 2.34.15.72-.11 2.18-.89 2.49-1.75.31-.86.31-1.6.22-1.75-.09-.15-.34-.24-.71-.42z" fill="#fff"/>
        </svg>
      </span>
      <span className="whatsapp-float-tooltip">
        Chat with us!
      </span>
    </a>
  );
}

export default WhatsappFloat;