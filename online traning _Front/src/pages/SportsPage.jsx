import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../sportspage.css";
import { Link } from "react-router-dom";

// صور الرياضات
import yoga from "../pictures/yoga.jpg";
import swimming from "../pictures/swimming.jpg";
import crossfit from "../pictures/Crossfit.jpg";
import background1 from "../pictures/background1.jpg";
import Boxing1 from "../pictures/Boxing1.jpeg";
import calestanecs from "../pictures/calestanecs.jpeg";
import diving from "../pictures/diving.jpeg";

// 🟩 كارت الرياضة
const Card = ({ title, description, image, role }) => {
  const cardStyle = {
    borderRadius: "12px",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    background: "#1f1f2e",
  };

  const imgStyle = {
    height: "200px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  };

  const buttonStyle = {
    background: "linear-gradient(90deg, #ff4d4f, #e03e3e)",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    transition: "all 0.3s ease",
  };

  return (
    <div
      className="card custom-card m-3 shadow-lg"
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
      }}
    >
      <img src={image} className="card-img-top" alt={title} style={imgStyle} />
      <div className="card-body text-center">
        <h5 className="card-title text-warning fw-bold">{title}</h5>
        <p className="card-text text-muted">{description}</p>
        <Link
          to={
            role === "trainer"
              ? `/trainer/course/${title.toLowerCase()}`
              : `/trainee/sport/${title.toLowerCase()}`
          }
          className="btn btn-sm"
          style={buttonStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #e03e3e, #b72b2b)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #ff4d4f, #e03e3e)")
          }
        >
          {role === "trainer" ? "Register" : "View More"}
        </Link>
      </div>
    </div>
  );
};

export default function SportsPage({ mode }) {
  const role = mode === "trainer" ? "trainer" : "trainee";

  // الرياضات الثابتة
  const defaultClasses = [
    { title: "Swimming", description: "Swimming for strength & stamina", image: swimming },
    { title: "Yoga", description: "Mind & body balance", image: yoga },
    { title: "Crossfit", description: "High intensity functional training", image: crossfit },
    { title: "Boxing", description: "Learn self-defense & cardio", image: Boxing1 },
    { title: "Calisthenics", description: "Bodyweight strength & control", image: calestanecs },
    { title: "Diving", description: "Indoor & outdoor diving basics", image: diving },
  ];

  const [classes, setClasses] = useState(defaultClasses);

  // هنا بنجيب الداتا من الباك إند لو موجودة
  useEffect(() => {
    fetch("http://localhost:5000/api/sports") // غير الرابط حسب API عندك
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // لو عندك صور وأوصاف فى الباك اند استخدمها، لو مش موجودة خذ من الثابت
          const merged = data.map((sport) => {
            const local = defaultClasses.find(
              (c) => c.title.toLowerCase() === sport.name.toLowerCase()
            );
            return {
              title: sport.name,
              description: sport.description || (local && local.description) || "",
              image: (local && local.image) || swimming, // fallback صورة
            };
          });
          setClasses(merged);
        }
      })
      .catch((err) => console.error("Error fetching sports:", err));
  }, []);

  const heroStyle = {
    backgroundImage: `url(${background1})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "300px",
    paddingTop: "100px",
    paddingBottom: "80px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  };

  const heroContentStyle = {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    color: "#fff",
  };

  const heroTitleStyle = {
    fontSize: "3rem",
    fontWeight: "900",
    marginBottom: "1rem",
    background: "linear-gradient(90deg, #ff4d4f, #e03e3e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
    letterSpacing: "1px",
  };

  const heroDescStyle = {
    fontSize: "1.2rem",
    color: "#ddd",
    maxWidth: "600px",
    margin: "0 auto",
    textShadow: "1px 1px 6px rgba(0,0,0,0.5)",
    letterSpacing: "0.5px",
  };

  return (
    <>
      <section style={heroStyle}>
        <div style={overlayStyle}></div>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>Our Sports Classes</h1>
          <p style={heroDescStyle}>Choose your favorite sport and start training today</p>
        </div>
      </section>

      <section className="container py-5">
        <div className="row">
          {classes.map((cls, index) => (
            <div className="col-md-4" key={index}>
              <Card
                title={cls.title}
                description={cls.description}
                image={cls.image}
                role={role}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
