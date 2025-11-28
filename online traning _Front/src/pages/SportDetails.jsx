import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import swimming from "../pictures/swimming.jpg";
import yoga from "../pictures/yoga.jpg";
import crossfit from "../pictures/Crossfit.jpg";
import Boxing1 from "../pictures/Boxing1.jpeg";
import calestanecs from "../pictures/calestanecs.jpeg";
import diving from "../pictures/diving.jpeg";

export default function SportDetail() {
  const { sportName } = useParams();
  const key = sportName.toLowerCase();
  const navigate = useNavigate();

  const sportsData = {
    swimming: {
      title: "Swimming",
      description:
        "Swimming is one of the best full-body workouts you can do. It strengthens the heart, lungs, and muscles while improving flexibility and coordination. It’s a low-impact sport that reduces stress on joints, making it suitable for all ages. Regular swimming enhances endurance, burns calories effectively, and boosts overall mental health by relieving stress.",
      image: swimming,
      trainers: [
        { name: "Coach Ahmed", rating: 4.8, image: "https://randomuser.me/api/portraits/men/11.jpg" },
        { name: "Coach Sara", rating: 4.6, image: "https://randomuser.me/api/portraits/women/23.jpg" },
        { name: "Coach Omar", rating: 4.7, image: "https://randomuser.me/api/portraits/men/34.jpg" },
        { name: "Coach Lina", rating: 4.5, image: "https://randomuser.me/api/portraits/women/45.jpg" }
      ]
    },
    yoga: {
      title: "Yoga",
      description:
        "Yoga is an ancient practice that combines physical postures, breathing techniques, and meditation. It improves flexibility, balance, and posture while reducing stress and anxiety. Practicing yoga regularly enhances concentration, boosts immunity, and encourages mindfulness. It’s not just a workout; it’s a journey towards inner peace and self-awareness.",
      image: yoga,
      trainers: [
        { name: "Coach Lina", rating: 4.9, image: "https://randomuser.me/api/portraits/women/34.jpg" },
        { name: "Coach Omar", rating: 4.7, image: "https://randomuser.me/api/portraits/men/22.jpg" },
        { name: "Coach Sarah", rating: 4.6, image: "https://randomuser.me/api/portraits/women/56.jpg" },
        { name: "Coach Ahmed", rating: 4.5, image: "https://randomuser.me/api/portraits/men/67.jpg" }
      ]
    },
    crossfit: {
      title: "Crossfit",
      description:
        "CrossFit is a high-intensity fitness program that combines weightlifting, cardio, and functional movements. It builds strength, agility, and endurance, making you faster and more powerful. Each workout is scalable, so beginners and professionals can benefit. CrossFit pushes your limits, increases discipline, and builds a supportive community around you.",
      image: crossfit,
      trainers: [
        { name: "Coach Karim", rating: 4.5, image: "https://randomuser.me/api/portraits/men/33.jpg" },
        { name: "Coach Jana", rating: 4.4, image: "https://randomuser.me/api/portraits/women/45.jpg" },
        { name: "Coach Ali", rating: 4.6, image: "https://randomuser.me/api/portraits/men/55.jpg" },
        { name: "Coach Dalia", rating: 4.7, image: "https://randomuser.me/api/portraits/women/67.jpg" }
      ]
    },
    boxing: {
      title: "Boxing",
      description:
        "Boxing is more than just throwing punches — it’s a discipline that sharpens the mind and strengthens the body. It improves stamina, coordination, and reflexes while building mental toughness. Training in boxing helps relieve stress, boost self-confidence, and enhance self-defense skills. It’s one of the most effective ways to burn calories and build endurance.",
      image: Boxing1,
      trainers: [
        { name: "Coach Ali", rating: 4.8, image: "https://randomuser.me/api/portraits/men/44.jpg" },
        { name: "Coach Nour", rating: 4.5, image: "https://randomuser.me/api/portraits/women/56.jpg" },
        { name: "Coach Karim", rating: 4.6, image: "https://randomuser.me/api/portraits/men/33.jpg" },
        { name: "Coach Jana", rating: 4.7, image: "https://randomuser.me/api/portraits/women/45.jpg" }
      ]
    },
    calisthenics: {
      title: "Calisthenics",
      description:
        "Calisthenics is a form of strength training that uses your own bodyweight as resistance. It builds raw strength, balance, and agility without the need for heavy equipment. From pull-ups to handstands, calisthenics improves functional fitness and body control. It’s perfect for athletes seeking mastery over their own body and a lean, powerful physique.",
      image: calestanecs,
      trainers: [
        { name: "Coach Yousef", rating: 4.6, image: "https://randomuser.me/api/portraits/men/55.jpg" },
        { name: "Coach Hala", rating: 4.7, image: "https://randomuser.me/api/portraits/women/67.jpg" },
        { name: "Coach Omar", rating: 4.5, image: "https://randomuser.me/api/portraits/men/22.jpg" },
        { name: "Coach Lina", rating: 4.8, image: "https://randomuser.me/api/portraits/women/34.jpg" }
      ]
    },
    diving: {
      title: "Diving",
      description:
        "Diving is an adventurous sport that combines physical endurance with mental focus. It improves breathing control, builds confidence, and develops strength. Whether indoor or open water, diving allows you to explore new worlds beneath the surface. It’s a sport of courage, precision, and breathtaking beauty that connects you deeply with nature.",
      image: diving,
      trainers: [
        { name: "Coach Rami", rating: 4.9, image: "https://randomuser.me/api/portraits/men/66.jpg" },
        { name: "Coach Dalia", rating: 4.6, image: "https://randomuser.me/api/portraits/women/12.jpg" },
        { name: "Coach Ahmed", rating: 4.7, image: "https://randomuser.me/api/portraits/men/11.jpg" },
        { name: "Coach Sara", rating: 4.5, image: "https://randomuser.me/api/portraits/women/23.jpg" }
      ]
    }
  };

  const sport = sportsData[key];

  if (!sport) {
    return (
      <h2 className="text-center mt-5 text-danger">
        This sport is not available yet.
      </h2>
    );
  }

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      {/* Hero Image */}
      <div className="text-center mb-5 position-relative">
        <img
          src={sport.image}
          alt={sport.title}
          className="img-fluid rounded shadow-lg"
          style={{
            maxHeight: "350px",
            border: "5px solid #ffc107",
            objectFit: "cover",
          }}
        />
        <h1
          className="mt-4 fw-bold"
          style={{
            fontSize: "3rem",
            background: "linear-gradient(90deg, #ffc107, #ffdd57)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          {sport.title}
        </h1>
        <p
          className="text-light fs-5 w-75 mx-auto mt-3"
          style={{ textShadow: "1px 1px 6px rgba(0,0,0,0.5)", letterSpacing: "0.5px" }}
        >
          {sport.description}
        </p>
      </div>

      {/* Trainers */}
      <div className="container">
        <h3 className="mb-4 text-warning">Meet the Trainers</h3>
        <div className="row">
          {sport.trainers.map((trainer, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="card bg-secondary text-white shadow-lg mb-4"
                style={{
                  borderRadius: "12px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
                }}
              >
                <div className="card-body text-center">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="rounded-circle mb-3 border border-warning"
                    style={{ width: "90px", height: "90px", objectFit: "cover" }}
                  />
                  <h5 className="fw-bold">{trainer.name}</h5>
                  <p className="text-warning">⭐ {trainer.rating}</p>
                  <button
                    className="btn w-100 fw-bold"
                    style={{
                      background: "linear-gradient(90deg, #ff4d4f, #e03e3e)",
                      color: "#fff",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "linear-gradient(90deg, #e03e3e, #b72b2b)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "linear-gradient(90deg, #ff4d4f, #e03e3e)")
                    }
                    onClick={() => navigate(`/trainee/sport/${sportName}/book`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
