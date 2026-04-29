// import { useEffect, useState } from "react";
// import "./css/AdminDashboard.css";
// export default function AdminDashboard() {
//   const [users,setUsers]=useState([]);

//   useEffect(()=>{
//     fetch("http://localhost:5000/api/result")
//       .then(res=>res.json())
//       .then(setUsers);
//   },[]);

//   return (
//     <div className="admin">
//       <h2>Admin Panel</h2>
//       {users.map(u=>(
//         <p key={u.name}>{u.name} - {u.votes}</p>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/AdminDashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // 🔄 Fetch data
  useEffect(() => {
    fetch("http://localhost:5000/api/result")
      .then(res => res.json())
      .then(setUsers)
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="admin-container">

      {/* 🔵 NAVBAR */}
      <div className="topbar">
        <h2>Admin Panel</h2>

        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Vote</Link>
          <Link to="/result">Result</Link>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* 🔷 CONTENT */}
      <div className="admin">
        <h2>Candidate Results</h2>

        {users.length === 0 ? (
          <p>No data available</p>
        ) : (
          users.map((u, i) => (
            <p key={i}>
              {u.name} - {u.votes} votes
            </p>
          ))
        )}
      </div>

    </div>
  );
}