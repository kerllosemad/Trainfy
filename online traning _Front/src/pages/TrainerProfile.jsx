import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TrainerProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      navigate("/"); // لو مفيش يوزر → يرجع لوجين
    } else {
      setUser(savedUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="border-0 shadow card">
            <div className="card-body text-center">
              {/* صورة رمزية (افتراضية لو مفيش صورة) */}
              <img
                src="https://via.placeholder.com/120"
                alt="Profile"
                className="rounded-circle mb-3"
              />

              {/* الاسم والايميل */}
              <h3 className="fw-bold text-primary">{user.name}</h3>
              <p className="text-muted">{user.email}</p>

              <hr />

              {/* بيانات اضافية للمدرب */}
              <div className="row text-start">
                <div className="mb-3 col-md-6">
                  <h6 className="text-secondary">Specialization</h6>
                  <p>⚽ Football Coach</p>
                </div>
                <div className="mb-3 col-md-6">
                  <h6 className="text-secondary">Experience</h6>
                  <p>5 Years</p>
                </div>
                <div className="mb-3 col-md-6">
                  <h6 className="text-secondary">Phone</h6>
                  <p>+20 100 123 4567</p>
                </div>
                <div className="mb-3 col-md-6">
                  <h6 className="text-secondary">Location</h6>
                  <p>Cairo, Egypt</p>
                </div>
              </div>

           
             <button
  className="btn btn-outline-primary mt-3"
  onClick={() => navigate("/trainer")}
>
   Back to Home
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
