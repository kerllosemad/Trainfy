import React from "react";

export default function TrainerMyWork() {
  // دي بيانات تجريبية للعرض — هتبدلها من الـ backend بعدين
  const trainees = [
    { id: 1, name: "Ahmed Ali", course: "Swimming", progress: "75%" },
    { id: 2, name: "Sara Mohamed", course: "Yoga", progress: "40%" },
    { id: 3, name: "Khaled Hassan", course: "Boxing", progress: "90%" },
  ];

  const tableStyle = {
    background: "#1f1f2e",
    color: "#fff",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "30px",
  };

  return (
    <div className="container" style={{ paddingTop: "30px" }}>
      <h2 className="text-center text-warning mb-4">My Trainees</h2>
      <div style={tableStyle}>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Trainee Name</th>
              <th>Course</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {trainees.map((trainee) => (
              <tr key={trainee.id}>
                <td>{trainee.id}</td>
                <td>{trainee.name}</td>
                <td>{trainee.course}</td>
                <td>{trainee.progress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
