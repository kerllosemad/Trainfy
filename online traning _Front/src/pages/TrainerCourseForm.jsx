import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import bgImage from "../pictures/bgForm.jpg"; // 🟩 الصورة اللي هتبقى خلفية

export default function TrainerCourseForm() {
  const { sportName } = useParams();

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    durationHours: "",
    daysPerWeek: 3,
    price: "",
    maxTrainees: "",
  });

  const [trainingDays, setTrainingDays] = useState(["", "", ""]);

  useEffect(() => {
    const daysCount = parseInt(formData.daysPerWeek) || 0;
    setTrainingDays(Array(daysCount).fill(""));
  }, [formData.daysPerWeek]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDayChange = (index, value) => {
    const updatedDays = [...trainingDays];
    updatedDays[index] = value;
    setTrainingDays(updatedDays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Data:", { sportName, ...formData, trainingDays });
    alert("Course created successfully!");
  };

  // 🟩 الشكل الجديد للفورم
  const wrapperStyle = {
    minHeight: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  };

  const formStyle = {
    width: "100%",
    maxWidth: "600px",
    background: "rgba(31, 31, 46, 0.85)", // خلفية شبه شفافة للفورم نفسه
    padding: "30px",
    borderRadius: "15px",
    color: "#fff",
    backdropFilter: "blur(8px)", // تأثير زجاجي بسيط
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "5px",
    display: "block",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "none",
  };

  const buttonStyle = {
    background: "linear-gradient(90deg, #ff4d4f, #e03e3e)",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    width: "100%",
  };

  return (
    <div style={wrapperStyle}>
      <div style={formStyle}>
        <h2 className="text-center text-warning mb-4">
          Add Course for {sportName.charAt(0).toUpperCase() + sportName.slice(1)}
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {parseInt(formData.daysPerWeek) > 1 ? (
            <div>
              <label style={labelStyle}>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          ) : (
            <div>
              <label style={labelStyle}>Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>Course Duration (Hours)</label>
            <input
              type="number"
              name="durationHours"
              value={formData.durationHours}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter total hours"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Days Per Week</label>
            <input
              type="number"
              name="daysPerWeek"
              value={formData.daysPerWeek}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {trainingDays.map((day, index) => (
            <div key={index}>
              <label style={labelStyle}>Day {index + 1} Name/Time</label>
              <input
                type="text"
                value={day}
                onChange={(e) => handleDayChange(index, e.target.value)}
                style={inputStyle}
                placeholder={`Enter details for day ${index + 1}`}
                required
              />
            </div>
          ))}

          <div>
            <label style={labelStyle}>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Price in EGP"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Max Trainees Number</label>
            <input
              type="number"
              name="maxTrainees"
              value={formData.maxTrainees}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Max trainees allowed"
              required
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}
