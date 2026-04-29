// // import "./css/Dashboard.css";

// // export default function UserDashboard() {
// //   const user = JSON.parse(localStorage.getItem("user"));

// //   return (
// //     <div className="user-dashboard">
// //       <h2>User Dashboard</h2>
// //       <p>Name: {user.username}</p>
// //       <p>Status: {user.voted ? "Voted" : "Not Voted"}</p>
// //     </div>
// //   );
// // }

// import "./css/Dashboard.css";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

// export default function UserDashboard() {

//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   return (
//     <div className="dashboard-container">

//       {/* 🔵 SIDEBAR */}
//       <div className="sidebar">
//         <h2>Online Voting</h2>

//         <ul>
//           <li>Overview</li>
//           <li>Settings</li>
//           <li>Results</li>
//           <li>Ballot</li>
//           <li>Voters</li>
//         </ul>

//         <div className="info">
//           <p>Start Date: 01/01/24</p>
//           <p>End Date: 05/01/24</p>
//         </div>
//       </div>

//       {/* 🟢 MAIN */}
//       <div className="main">

//         <h1>Welcome, {user.username}</h1>

//         {/* 📊 CHART */}
//         <div className="chart-box">
//           <h3>Voting Activity</h3>

//           <Line
//             data={{
//               labels: ["Day1", "Day2", "Day3", "Day4", "Day5"],
//               datasets: [
//                 {
//                   label: "Votes",
//                   data: [10, 30, 20, 40, 25]
//                 }
//               ]
//             }}
//           />
//         </div>

//         {/* 📊 CARDS */}
//         <div className="cards">

//           <div className="card green">
//             <h2>64%</h2>
//             <p>Participation</p>
//           </div>

//           <div className="card orange">
//             <h2>1961</h2>
//             <p>Voters</p>
//           </div>

//           <div className="card pink">
//             <h2>2</h2>
//             <p>Ballot Questions</p>
//           </div>

//           <div className="card purple">
//             <h2>266</h2>
//             <p>Options</p>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

import { useNavigate, Link } from "react-router-dom";
import "./css/Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function UserDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* 🔵 SIDEBAR */}
      <div className="sidebar">
        <h2>Online Voting</h2>

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Vote</Link></li>
          <li><Link to="/result">Result</Link></li>
        </ul>

        <div className="info">
          <p>User: {user.username}</p>
          <p>Status: {user.voted ? "Voted" : "Not Voted"}</p>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* 🟢 MAIN */}
      <div className="main">

        <h1>Welcome, {user.username}</h1>

        {/* 📊 CHART */}
        <div className="chart-box">
          <h3>Voting Activity</h3>

          <Line
            data={{
              labels: ["Day1", "Day2", "Day3", "Day4", "Day5"],
              datasets: [
                {
                  label: "Votes",
                  data: [10, 30, 20, 40, 25]
                }
              ]
            }}
          />
        </div>

        {/* 📊 CARDS */}
        <div className="cards">

          <div className="card green">
            <h2>64%</h2>
            <p>Participation</p>
          </div>

          <div className="card orange">
            <h2>1961</h2>
            <p>Voters</p>
          </div>

          <div className="card pink">
            <h2>2</h2>
            <p>Ballot Questions</p>
          </div>

          <div className="card purple">
            <h2>266</h2>
            <p>Options</p>
          </div>

        </div>

      </div>

    </div>
  );
}