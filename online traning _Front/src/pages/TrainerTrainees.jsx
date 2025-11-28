import { Link } from "react-router-dom";

export default function TrainerTrainees() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">My Trainees</h2>

      <div className="p-3 shadow card">
        <h5 className="mb-3">Trainees List</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Omar Hosny (Football)</li>
          <li className="list-group-item">Ali Mahmoud (Swimming)</li>
          <li className="list-group-item">Mona Ahmed (Tennis)</li>
        </ul>
      </div>

      <Link to="/trainer" className="mt-3 btn btn-dark">
         Back
      </Link>
    </div>
  );
}
