import { Link, useNavigate } from "react-router-dom";
import "./css/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="home-container">

      {/* 🔹 NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">Online Voting</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/dashboard">Vote</Link>
              <Link to="/user-dashboard">Dashboard</Link>
              <Link to="/result">Result</Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}

          <a href="#about">About</a>
        </div>
      </nav>

      {/* 🔹 HERO SECTION */}
      <div className="hero">
        <h1>Welcome to Online Voting System</h1>
        <p>
          A secure and transparent platform for digital voting.
          Vote easily and view results instantly.
        </p>

        {!user && (
          <div className="buttons">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        )}
      </div>

      {/* 🔹 ABOUT SECTION */}
      <div className="about" id="about">
        <h2>About Project</h2>
        <p>
          This Online Voting System allows users to register using
          Username, Father Name, Date of Birth, UserID and Password.
          Only users above 18 years can vote.
        </p>
        <p>
          Each user can vote only once, and results are displayed
          instantly in graphical form. Admin can monitor users and votes.
        </p>
      </div>

    </div>
  );
}