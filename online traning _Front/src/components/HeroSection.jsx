import React from "react";
import "./HeroSection.css";
import heroImage from "../assets/hero.png";

export default function HeroSection({ handleStart }) {
  return (
    <section
      className="text-white hero d-flex align-items-center"
  style={{
  backgroundImage: `url(${heroImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  minHeight: "100vh", // يخليها على قد الشاشة على الأقل
  position: "relative", 
}}
    >
      <button
        className="btn btn-warning fw-bold"
        onClick={handleStart}
        style={{
          position: "absolute",
          top: "400px", // يظهر فوق الصورة مباشرة
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        START NOW
      </button>

<div className="container text-center" style={{ zIndex: 2, position: "relative" }}>
  <h1
    style={{
      fontSize: "3.5rem",
      fontWeight: "800",
      background: "linear-gradient(90deg, #fcd34d, #fbbf24)", // تدرج أصفر فاتح إلى أصفر داكن
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "3px 3px 15px rgba(0,0,0,0.6)",
      lineHeight: 1.2,
      animation: "fadeInUp 1s ease-out forwards",
      opacity: 0,
    }}
  >
    Start your journey <br /> towards excellence today
  </h1>
</div>




    </section>
  );
}
