import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser?.email) {
      // ✅ نجيب بياناته من الباك إند
      axios
        .get(`http://localhost:5000/auth/user/${savedUser.email}`)
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load profile data");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("No user data found in localStorage.");
    }
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="container py-5">
        <h2 className="mb-4">User Profile</h2>

        {loading ? (
          <div className="alert alert-info">Loading...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : user ? (
          <div className="p-3 shadow card">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        ) : (
          <div className="alert alert-warning">No user data found.</div>
        )}
      </div>
    </>
  );
}
