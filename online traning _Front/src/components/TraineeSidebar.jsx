// src/components/TraineeSidebar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function TraineeSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // يمسح بيانات المستخدم
    navigate("/login"); // يودّي لصفحة تسجيل الدخول
  };

  return (
    <aside className="sidebar bg-primary text-white p-3">
      <h4 className="mb-4">Trainee</h4>
      <nav className="nav flex-column">
        {/* زرار Home يروح لصفحة SportsPage */}
        <Link className="nav-link text-white" to="/trainee/sports">
          Home
        </Link>
        <Link className="nav-link text-white" to="/trainee/profile">
          Profile
        </Link>
        <Link className="nav-link text-white" to="/trainee/courses">
          Courses
        </Link>
        {/* زرار About Us */}
        <Link className="nav-link text-white" to="/about-us">
          About Us
        </Link>
      </nav>

      {/* زرار Logout */}
      <button
        onClick={handleLogout}
        className="btn btn-danger mt-3 w-100"
      >
        Logout
      </button>
    </aside>
  );
}
