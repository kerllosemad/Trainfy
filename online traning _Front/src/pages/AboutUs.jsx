import { FaUsers, FaDumbbell, FaCalendarAlt, FaPalette, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();

  const handleBack = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login"); // لو مفيش يروح لصفحة تسجيل الدخول
      return;
    }

    switch (user.role) {
      case "admin":
        navigate("/admin-dashboard"); // ✅ Admin Dashboard
        break;
      case "trainer":
        navigate("/trainer/sports"); // ✅ SportsPage بتاعة Trainer
        break;
      case "trainee":
        navigate("/trainee/sports"); // ✅ SportsPage بتاعة Trainee
        break;
      default:
        navigate("/"); // fallback لو حصل خطأ
    }
  };

  return (
    <div className="about-us container py-5">
      {/* العنوان */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">About Us</h1>
        <p className="text-muted fs-5">
          Discover who we are, what we stand for, and why thousands trust our platform.
        </p>
      </div>

      {/* القسم الأول - المقدمة */}
      <section className="mb-5">
        <h2 className="fw-bold mb-3">Who We Are</h2>
        <p className="fs-5">
          Welcome to our <span className="fw-bold text-warning">Online Training Platform</span>!   
          We’re passionate about making sports, fitness, and wellness available to everyone, anytime, anywhere.  
          Our platform connects you with top trainers and offers a wide range of sports to suit every lifestyle.
        </p>
      </section>

      {/* القسم الثاني - الرؤية */}
      <section className="mb-5">
        <h2 className="fw-bold mb-3">Our Mission & Vision</h2>
        <p className="fs-5">
          We believe that sports are more than just activities – they are a way of life.  
          Our mission is to build a global community of athletes, trainers, and enthusiasts  
          who share the same love for fitness and health.  
        </p>
        <p className="fs-5">
          <strong className="text-success">Vision:</strong> To become the leading online hub where passion for sports  
          meets advanced technology, making training smooth, fun, and effective.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="mb-5">
        <h2 className="fw-bold mb-4 text-center">Why Choose Us?</h2>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow border-0 rounded-4 text-center p-3">
              <FaUsers size={40} className="text-primary mb-3" />
              <h5>Expert Trainers</h5>
              <p>Our professional trainers bring years of experience to guide you every step of the way.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow border-0 rounded-4 text-center p-3">
              <FaDumbbell size={40} className="text-danger mb-3" />
              <h5>Wide Variety</h5>
              <p>From football  to fitness , swimming  to basketball  – choose your favorite sport!</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow border-0 rounded-4 text-center p-3">
              <FaCalendarAlt size={40} className="text-success mb-3" />
              <h5>Easy Booking</h5>
              <p>Book your sessions effortlessly with just a few clicks – convenience at its best.</p>
            </div>
          </div>
          {/* الكارد الجديد */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 shadow border-0 rounded-4 text-center p-3">
              <FaPalette size={40} className="text-info mb-3" />
              <h5>Comfortable Colors</h5>
              <p>
                We designed our platform with eye-friendly colors   
                to give you a smooth experience without straining your eyes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* القسم الأخير - رسالة ختامية */}
      <section className="text-center mt-5">
        <h2 className="fw-bold">Join Our Community</h2>
        <p className="fs-5">
          With <FaCheckCircle className="text-success" /> trusted trainers, a variety of sports,  
          and a strong community, we’re here to transform your fitness journey.  
        </p>
        <p className="fs-5 fw-semibold text-primary">
          Thank you for choosing us. Stay healthy, stay active, and achieve greatness with us
        </p>
      </section>

      {/* زرار الرجوع */}
      <div className="text-center mt-4">
        <button
          onClick={handleBack}
          className="btn btn-outline-primary px-4 py-2 rounded-3"
        >
          Back
        </button>
      </div>
    </div>
  );
}
