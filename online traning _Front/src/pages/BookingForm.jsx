import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // 🟩 استيراد axios
import bgImage from "../pictures/bgForm.jpg";

export default function BookingForm() {
  const { sportName } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    height: "",
    weight: "",
    healthCondition: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/trainee/book", {
        sportName,
        ...formData,
      });

      alert(`Booking submitted successfully for ${sportName}`);
      navigate(`/trainee/sport/${sportName}`);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed, please try again.");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center position-relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0,
        }}
      ></div>

      <form
        className="p-5 rounded shadow-lg text-white"
        style={{
          backgroundColor: "rgba(31,31,46,0.9)",
          width: "100%",
          maxWidth: "500px",
          zIndex: 1,
        }}
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-warning text-center">Book {sportName}</h2>

        {/* Age */}
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Height */}
        <div className="mb-3">
          <label className="form-label">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Weight */}
        <div className="mb-3">
          <label className="form-label">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Health Condition */}
        <div className="mb-3">
          <label className="form-label">Health Condition</label>
          <textarea
            name="healthCondition"
            value={formData.healthCondition}
            onChange={handleChange}
            className="form-control"
            rows="3"
            placeholder="Write any health issues or special conditions here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn w-100 fw-bold"
          style={{
            background: "linear-gradient(90deg, #ff4d4f, #e03e3e)",
            color: "#fff",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
