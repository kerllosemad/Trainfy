import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TraineeCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 🟩 هات الإيميل من localStorage عشان تحدد المتدرب
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser?.email) {
      axios
        .get(`http://localhost:5000/trainee/courses/${savedUser.email}`)
        .then((res) => {
          setCourses(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load courses");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("User not found. Please login again.");
    }
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Courses</h2>

      <div className="p-3 shadow card">
        <h5 className="mb-3">Subscribed Sports</h5>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : courses.length === 0 ? (
          <p className="text-warning">No courses subscribed yet.</p>
        ) : (
          <ul className="list-group list-group-flush">
            {courses.map((c, index) => (
              <li key={index} className="list-group-item">
                {c.title} with Coach {c.coach}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link to="/trainee" className="mt-3 btn btn-dark">
        Back
      </Link>
    </div>
  );
}
