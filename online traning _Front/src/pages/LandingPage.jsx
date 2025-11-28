import React from "react";
import { useNavigate } from "react-router-dom";
import "../LandingPage.css";
import heroImage from "../assets/Heero.jpg"; // حط الصورة اللي عندك هنا

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page text-white">
      {/* Hero Section */}
      <section
        className="hero d-flex align-items-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="container">
          <h1 className="hero-title">
            ACHIEVE <span>MORE</span> THAN JUST FITNESS
          </h1>
          <p className="hero-subtitle">
            Combine strength, flexibility, and endurance in a community that
            values well-rounded health and supportive growth.
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-warning btn-lg fw-bold me-3"
              onClick={() => navigate("/login")}
            >
              START NOW
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats text-center">
        <div className="container d-flex justify-content-around flex-wrap">
          <div className="stat-item">
            <h2>500+</h2>
            <p>Happy Members</p>
          </div>
          <div className="stat-item">
            <h2>30+</h2>
            <p>Weekly Classes</p>
          </div>
          <div className="stat-item">
            <h2>10</h2>
            <p>Certified Trainers</p>
          </div>
          <div className="stat-item">
            <h2>99%</h2>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </section>
    </div>
  );
}
