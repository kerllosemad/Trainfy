// src/pages/TraineeDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../TraineeDashboard.css"; // استايل الداشبورد

export default function TraineeDashboard() {
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
      {/* ✅ الهوم للمتدرب هيعرض الرياضات (SportsPage) مش محتاج هنا محتوى إضافي */}
      <main className="content p-4">
        <h2 className="mb-4">Welcome, {user?.name || "Trainee"} 👋</h2>
        <p>Explore your available sports and start your journey!</p>
      </main>
    </div>
  );
}
