// src/components/TrainerSidebar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TrainerSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside style={{ width: 240 }} className="bg-dark text-white p-3">
      <h4 className="mb-4">Trainer</h4>
      <nav className="nav flex-column">
        {/* زرار Home يروح لصفحة SportsPage الخاصة بالمدرب */}
        <Link className="nav-link text-white" to="/trainer/sports">
          Home
        </Link>
        <Link className="nav-link text-white" to="/trainer/courses">
          My Courses
        </Link>
        <Link className="nav-link text-white" to="/trainer/profile">
          Profile
        </Link>
        {/* زرار About Us */}
        <Link className="nav-link text-white" to="/about-us">
          About Us
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="btn btn-danger mt-3 w-100"
      >
        Logout
      </button>
    </aside>
  );
}
