import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  // تسجيل خروج → مسح البيانات + رجوع لصفحة تسجيل الدخول
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* اللوجو أو اسم الموقع */}
        <Link className="navbar-brand" to="/">
          Online Training
        </Link>

        {/* زرار القائمة في الموبايل */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* عناصر النافبار */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* لينكات ديناميكية حسب دور المستخدم */}
            {user?.role === "trainee" && (
              <li className="nav-item">
                <Link className="nav-link" to="/trainee">
                  Dashboard
                </Link>
              </li>
            )}

            {user?.role === "trainer" && (
              <li className="nav-item">
                <Link className="nav-link" to="/trainer">
                  Dashboard
                </Link>
              </li>
            )}

            {/* لينكات عامة */}
            <li className="nav-item">
              <Link className="nav-link" to="#">
                About
              </Link>
            </li>
          </ul>

          {/* بيانات المستخدم + قائمة منسدلة */}
          {user && (
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="userMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hi, {user.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/settings">
                    Settings
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
