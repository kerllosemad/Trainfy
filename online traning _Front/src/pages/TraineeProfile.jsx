import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TraineeProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      // لو انت مخزن ال id
      fetch(`http://localhost:5000/api/trainee/${savedUser._id}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div
      className="container py-5 d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #1f1f2e, #14141f)",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
      }}
    >
      <div style={{ width: "100%", maxWidth: "450px" }}>
        <h2
          className="mb-4 text-center"
          style={{
            color: "#ffc107",
            fontWeight: 800,
            letterSpacing: "1px",
            marginBottom: "30px",
          }}
        >
          Trainee Profile
        </h2>

        {user ? (
          <div
            className="card p-4 shadow-lg border-0"
            style={{
              background: "rgba(31, 31, 46, 0.95)",
              borderRadius: "15px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <h5
              className="mb-3"
              style={{
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#ffc107",
              }}
            >
              <i className="bi bi-person-circle"></i> {user.name}
            </h5>
            <p style={{ color: "#ddd", marginBottom: "10px" }}>
              <strong style={{ color: "#fff" }}>Email:</strong> {user.email}
            </p>
            <p style={{ color: "#ddd", marginBottom: "10px" }}>
              <strong style={{ color: "#fff" }}>Role:</strong> {user.role || "Trainee"}
            </p>
            <Link
              to="/trainee"
              className="btn w-100 mt-3"
              style={{
                padding: "12px",
                borderRadius: "30px",
                background: "linear-gradient(90deg, #ff4d4f, #e03e3e)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1rem",
                textAlign: "center",
                display: "block",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(90deg, #e03e3e, #b72b2b)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(90deg, #ff4d4f, #e03e3e)")
              }
            >
              Back
            </Link>
          </div>
        ) : (
          <div
            className="alert"
            style={{
              background: "#3a3a5a",
              color: "#ffc107",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            No profile data found.
          </div>
        )}
      </div>
    </div>
  );
}
