import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaDumbbell, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const sidebarStyle = {
    width: "260px",
    height: "100vh",
    top: 0,
    left: 0,
    background: "linear-gradient(180deg, #1f1f2e, #111123)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "2rem 1.5rem",
    boxShadow: "4px 0 20px rgba(0,0,0,0.7)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    fontSize: "1.8rem",
    marginBottom: "2rem",
    borderBottom: "1px solid #444",
    paddingBottom: "0.5rem",
    letterSpacing: "1px",
  };

  const navLinkStyle = {
    color: "#aaa",
    padding: "0.75rem 1rem",
    fontSize: "1.1rem",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderRadius: "8px",
    marginBottom: "0.5rem",
    transition: "all 0.3s ease",
  };

  const navLinkActiveStyle = {
    color: "#fff",
    background: "#3b3b6a",
    paddingLeft: "1rem",
    boxShadow: "0 0 10px rgba(255,255,255,0.2)",
  };

  const buttonStyle = {
    marginTop: "10px", // مباشرة تحت My Sports
    padding: "0.6rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(90deg, #ff4d4f, #e03e3e)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  return (
    <aside style={sidebarStyle}>
      <h4 style={headingStyle}>{user?.name || "Trainee"}</h4>

      <nav className="nav flex-column">
        <NavLink
          to="/trainee"
          end
          style={({ isActive }) =>
            isActive ? { ...navLinkStyle, ...navLinkActiveStyle } : navLinkStyle
          }
        >
          <FaHome /> Home
        </NavLink>

        <NavLink
          to="/trainee/profile"
          style={({ isActive }) =>
            isActive ? { ...navLinkStyle, ...navLinkActiveStyle } : navLinkStyle
          }
        >
          <FaUser /> Profile
        </NavLink>

   <NavLink
  to="/trainer/my-work"  
  style={({ isActive }) =>
    isActive ? { ...navLinkStyle, ...navLinkActiveStyle } : navLinkStyle
  }
>
  <FaDumbbell /> My work
</NavLink>

        {/* زرار Logout مباشرة تحت My Sports */}
        <button
          style={buttonStyle}
          onClick={handleLogout}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #e03e3e, #b72b2b)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #ff4d4f, #e03e3e)")
          }
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </aside>
  );
}
