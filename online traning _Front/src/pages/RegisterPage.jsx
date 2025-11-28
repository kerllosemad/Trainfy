import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Auth.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("trainee");

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.email === email);

    if (userExists) {
      alert("User already exists!");
      return;
    }

    const newUser = { email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="role-select">
            <label>
              <input
                type="radio"
                value="trainer"
                checked={role === "trainer"}
                onChange={(e) => setRole(e.target.value)}
              />
              Trainer
            </label>
            <label>
              <input
                type="radio"
                value="trainee"
                checked={role === "trainee"}
                onChange={(e) => setRole(e.target.value)}
              />
              Trainee
            </label>
          </div>

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <span
            className="auth-link"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
