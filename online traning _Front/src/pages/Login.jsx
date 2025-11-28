import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../LoginPage.css";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("trainee");
  const [isRegister, setIsRegister] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (isRegister) {
        res = await axios.post("http://localhost:5000/auth/signup", {
          name,
          email,
          password,
          role,
        });
        alert("Account created successfully");
      } else {
        res = await axios.post("http://localhost:5000/auth/login", {
          email,
          password,
        });
        alert("Login successful");
      }

      // خزّن بيانات اليوزر مرة واحدة بس
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: res.data.email,
          role: res.data.role,
          name: res.data.name || name,
        })
      );

      // Redirect حسب الدور
      if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else if (res.data.role === "trainer") {
        navigate("/trainer");
      } else {
        navigate("/trainee");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "حدث خطأ ❌");
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg p-4">
        <h2 className="text-center mb-4 fw-bold">
          {isRegister ? "Create Account" : "Login"}
        </h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 d-flex gap-3">
                <label className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="role"
                    value="trainee"
                    checked={role === "trainee"}
                    onChange={() => setRole("trainee")}
                  />
                  Trainee
                </label>

                <label className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="role"
                    value="trainer"
                    checked={role === "trainer"}
                    onChange={() => setRole("trainer")}
                  />
                  Trainer
                </label>
              </div>
            </>
          )}

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-warning w-100 fw-bold">
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-3 text-center switch-text">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsRegister(false)}>Login</span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setIsRegister(true)}>Sign Up</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
