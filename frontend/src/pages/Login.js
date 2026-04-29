// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./css/Login.css";
// export default function Login() {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//    const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const [form, setForm] = useState({
//     username: "",
//     fatherName: "",
//     dob: "",
//     password: ""
//   });
//   const [error, setError] = useState("");

//   const handleChange = e =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();

//     const dobDate = new Date(form.dob);
//     const today = new Date();

//     if (dobDate > today) {
//       setError("Wrong Date of Birth");
//       return;
//     }

//     let age = today.getFullYear() - dobDate.getFullYear();
//     if (age < 18) {
//       setError("You are not eligible");
//       return;
//     }

//     const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: {"Content-Type":"application/json"},
//       body: JSON.stringify(form)
//     });

//     const data = await res.json();
//     if (!res.ok) return setError(data.message);

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));

//     navigate("/dashboard");
//   };

//   return (

//     <div className="box">
//      {user && (
//             <>
//               <Link to="/dashboard">Vote</Link>
//               <Link to="/user-dashboard">Dashboard</Link>
//               <Link to="/result">Result</Link>
//               <button onClick={handleLogout} className="logout-btn">
//                 Logout
//               </button>
//             </>
//           )}
//     <form className="form" onSubmit={handleSubmit}>

      

//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}

//       <input name="username" placeholder="Username" onChange={handleChange}/>
//       <input name="fatherName" placeholder="Father Name" onChange={handleChange}/>
//       <input type="date" name="dob" onChange={handleChange}/>
//       <input type="password" name="password" placeholder="Password" onChange={handleChange}/>

//       <button>Login</button>
//     </form></div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Login.css";

export default function Login() {
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
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    const dobDate = new Date(form.dob);
    const today = new Date();

    if (dobDate > today) {
      setError("Wrong Date of Birth");
      return;
    }

    let age = today.getFullYear() - dobDate.getFullYear();
    if (age < 18) {
      setError("You are not eligible");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");

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

      {/* 🔐 LOGIN FORM */}
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input
          name="fatherName"
          placeholder="Father Name"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dob"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

    </div>
  );
}