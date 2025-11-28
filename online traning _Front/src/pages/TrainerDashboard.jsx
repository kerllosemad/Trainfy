// src/pages/TrainerDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../TrainerDashboard.css"; // CSS منفصل

export default function TrainerDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      navigate("/");
    } else {
      setUser(savedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard">
      {/* ✅ Main Content فقط (من غير Sidebar) */}
      <main className="content p-4">
        <h2 className="mb-4">Trainer Dashboard</h2>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h4>15</h4>
              <p>Trainees</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h4>6</h4>
              <p>Active Courses</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow p-3 text-center">
              <h4>92%</h4>
              <p>Progress Rate</p>
            </div>
          </div>
        </div>

        {/* Trainees Table */}
        <div className="card shadow">
          <div className="card-header fw-bold">Your Trainees</div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sport</th>
                  <th>Level</th>
                  <th>Last Session</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Omar Hosny</td>
                  <td>Football</td>
                  <td>Intermediate</td>
                  <td>Yesterday</td>
                  <td>
                    <button className="btn btn-sm btn-primary">View</button>
                  </td>
                </tr>
                <tr>
                  <td>Ali Mahmoud</td>
                  <td>Swimming</td>
                  <td>Beginner</td>
                  <td>2 days ago</td>
                  <td>
                    <button className="btn btn-sm btn-primary">View</button>
                  </td>
                </tr>
                <tr>
                  <td>Mona Ahmed</td>
                  <td>Tennis</td>
                  <td>Advanced</td>
                  <td>Today</td>
                  <td>
                    <button className="btn btn-sm btn-primary">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
