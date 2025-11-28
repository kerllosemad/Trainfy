// src/pages/TrainerCourses.jsx
import React from "react";

export default function TrainerCourses() {
  // بيانات تجريبية (تتغير بعدين بـ API)
  const courses = ["Football", "Basketball", "Yoga", "Tennis"];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Courses</h2>
      {courses.length > 0 ? (
        <ul className="list-group">
          {courses.map((course, index) => (
            <li key={index} className="list-group-item">
              {course}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}
