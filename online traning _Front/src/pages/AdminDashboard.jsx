import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../AdminDashboard.css";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser || savedUser.role !== "admin") {
      navigate("/");
    } else {
      setUser(savedUser);
      axios
        .get("http://localhost:5000/admin/report", {
          headers: {
            email: "admin@system.com",
            password: "123456",
          },
        })
        .then((res) => setReport(res.data))
        .catch((err) => console.error("Error fetching report:", err));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
      <aside className="sidebar p-3">
        <h4 className="text-center mb-4">{user?.name || "Admin"}</h4>
        <nav className="nav flex-column">
          <li className="nav-item mb-3">
            <button
              className="btn btn-primary w-100 rounded-3 fw-bold"
              onClick={() => navigate("/admin-dashboard")}
            >
              Home
            </button>
          </li>
          <li className="nav-item mb-3">
            <Link
              className="btn btn-outline-info w-100 rounded-3 fw-bold"
              to="/about"
            >
              About Us
            </Link>
          </li>
          <li className="nav-item mb-3">
            <button
              onClick={toggleDarkMode}
              className="btn btn-outline-secondary w-100 rounded-3 fw-bold"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={handleLogout}
              className="btn btn-danger w-100 rounded-3 fw-bold"
            >
              Logout
            </button>
          </li>
        </nav>
      </aside>

      <main className="content p-4">
        <div className="navbar mb-4 fs-4 fw-bold"> Admin Dashboard</div>

        {report ? (
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card p-3 shadow-sm text-center">
                <h6>Total Sessions</h6>
                <p className="fw-bold">{report.statistics.totalSessions}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow-sm text-center">
                <h6>Total Sports</h6>
                <p className="fw-bold">{report.statistics.totalSports}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow-sm text-center">
                <h6>Trainers</h6>
                <p className="fw-bold">{report.statistics.totalTrainers}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3 shadow-sm text-center">
                <h6>Trainees</h6>
                <p className="fw-bold">{report.statistics.totalTrainees}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading reports...</p>
        )}

        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 rounded-4 p-3 text-center">
              <h5 className="mb-3 fw-bold">View Reports</h5>
              <p>Check system statistics and logs.</p>
              <button
                className="btn btn-warning fw-bold px-5 mx-auto"
                onClick={() => navigate("/admin/reports")}
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
