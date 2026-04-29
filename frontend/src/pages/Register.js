// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./css/Register.css";

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     fatherName: "",
//     dob: "",
//     userid: "",
//     password: ""
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const dobDate = new Date(form.dob);
//     const today = new Date();

//     // ❌ Future DOB check
//     if (dobDate > today) {
//       setError("Invalid Date of Birth");
//       return;
//     }

//     // ❌ Empty field check
//     if (!form.username || !form.fatherName || !form.userid || !form.password) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(form)
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Registration failed");
//         return;
//       }

//       setSuccess("Registration successful ✅");

//       // Redirect after 2 sec
//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);

//     } catch (err) {
//       setError("Server error");
//     }
//   };

//   return (
//     <form className="form" onSubmit={handleSubmit}>
//       <h2>Register</h2>

//       {error && <p className="error">{error}</p>}
//       {success && <p style={{ color: "lightgreen" }}>{success}</p>}

//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         value={form.username}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="text"
//         name="fatherName"
//         placeholder="Father's Name"
//         value={form.fatherName}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="date"
//         name="dob"
//         value={form.dob}
//         max={new Date().toISOString().split("T")[0]}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="text"
//         name="userid"
//         placeholder="User ID"
//         value={form.userid}
//         onChange={handleChange}
//         required
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={handleChange}
//         required
//       />

//       <button type="submit">Register</button>
//     </form>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Register.css";

export default function Register() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [form, setForm] = useState({
    username: "",
    fatherName: "",
    dob: "",
    userid: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const dobDate = new Date(form.dob);
    const today = new Date();

    if (dobDate > today) {
      setError("Invalid Date of Birth");
      return;
    }

    if (!form.username || !form.fatherName || !form.userid || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful ✅");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError("Server not connected");
    }
  };

  return (
    <div className="container">

      {/* 🔵 NAVBAR */}
      <nav className="navbar">
        <h2>Online Voting</h2>

        <div className="links">
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
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      {/* 📝 FORM */}
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}
        {success && <p style={{ color: "lightgreen" }}>{success}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          value={form.fatherName}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dob"
          value={form.dob}
          max={new Date().toISOString().split("T")[0]}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="userid"
          placeholder="User ID"
          value={form.userid}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>

    </div>
  );
}