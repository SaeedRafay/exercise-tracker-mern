import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        ExerciseTracker
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Exercises
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">
              Create Exercise
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user" className="nav-link">
              Create User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
