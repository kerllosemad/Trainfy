import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TraineeSports() {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) return;

    // استدعاء الباك اند اللى بيرجع الجلسات المسجلة للمستخدم
    fetch(`http://localhost:5000/api/my-sessions?traineeId=${savedUser._id}`)
      .then(res => res.json())
      .then(data => setSports(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-success">My Sports</h2>

      <div className="row">
        {sports.length > 0 ? (
          sports.map((s, i) => (
            <div key={i} className="mb-3 col-md-4">
              <div className="border-0 shadow card">
                <div className="card-body">
                  <h5 className="card-title">{s.sportName}</h5>
                  <p className="card-text">With Coach {s.coachName}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No sports booked yet.</p>
        )}
      </div>

      <Link to="/trainee" className="mt-3 btn btn-dark">Back</Link>
    </div>
  );
}
