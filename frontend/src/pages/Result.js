// // import { useEffect, useState } from "react";
// // import "./css/Result.css";
// // import { Bar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement
// // } from "chart.js";

// // ChartJS.register(CategoryScale, LinearScale, BarElement);

// // export default function Result() {
// //   const [data,setData]=useState([]);

// //   useEffect(()=>{
// //     fetch("http://localhost:5000/api/result")
// //       .then(res=>res.json())
// //       .then(setData);
// //   },[]);

// //   return (
// //     <div>
// //       <h2>Result</h2>
// //       <Bar data={{
// //         labels:data.map(d=>d.name),
// //         datasets:[{data:data.map(d=>d.votes)}]
// //       }}/>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement
// } from "chart.js";
// import { Bar, Pie } from "react-chartjs-2";
// import "./css/Result.css";

// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement);

// export default function Result() {

//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/result")
//       .then(res => res.json())
//       .then(setData);
//   }, []);

//   const labels = data.map(d => d.name);
//   const votes = data.map(d => d.votes);

//   return (
//     <div className="result-container">

//       <h1>Voting Result Dashboard</h1>

//       <div className="grid">

//         {/* 📊 BAR CHART */}
//         <div className="card">
//           <h3>Candidate Votes</h3>
//           <Bar
//             data={{
//               labels,
//               datasets: [{
//                 label: "Votes",
//                 data: votes
//               }]
//             }}
//           />
//         </div>

//         {/* 🥧 PIE CHART */}
//         <div className="card">
//           <h3>Vote Distribution</h3>
//           <Pie
//             data={{
//               labels,
//               datasets: [{
//                 data: votes
//               }]
//             }}
//           />
//         </div>

//         {/* 📈 STATS */}
//         <div className="card">
//           <h3>Total Votes</h3>
//           <h1>{votes.reduce((a,b)=>a+b,0)}</h1>
//         </div>

//         {/* 📊 TABLE */}
//         <div className="card full">
//           <h3>Detailed Results</h3>

//           <table>
//             <thead>
//               <tr>
//                 <th>Candidate</th>
//                 <th>Votes</th>
//               </tr>
//             </thead>

//             <tbody>
//               {data.map((d,i)=>(
//                 <tr key={i}>
//                   <td>{d.name}</td>
//                   <td>{d.votes}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//         </div>

//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "./css/Result.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement);

export default function Result() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // 🔄 Fetch data
  useEffect(() => {
    fetch("http://localhost:5000/api/result")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.log(err));
  }, []);

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const labels = data.map(d => d.name);
  const votes = data.map(d => d.votes);

  return (
    <div className="result-container">

      {/* 🔵 NAVBAR */}
      <div className="topbar">
        <h2>Online Voting</h2>

        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Vote</Link>
          <Link to="/user-dashboard">User Dashboard</Link>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* 🔷 TITLE */}
      <h1>Voting Result Dashboard</h1>

      <div className="grid">

        {/* 📊 BAR CHART */}
        <div className="card">
          <h3>Candidate Votes</h3>
          <Bar
            data={{
              labels,
              datasets: [{
                label: "Votes",
                data: votes
              }]
            }}
          />
        </div>

        {/* 🥧 PIE CHART */}
        <div className="card">
          <h3>Vote Distribution</h3>
          <Pie
            data={{
              labels,
              datasets: [{
                data: votes
              }]
            }}
          />
        </div>

        {/* 📈 STATS */}
        <div className="card">
          <h3>Total Votes</h3>
          <h1>{votes.reduce((a,b)=>a+b,0)}</h1>
        </div>

        {/* 📊 TABLE */}
        <div className="card full">
          <h3>Detailed Results</h3>

          <table>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Votes</th>
              </tr>
            </thead>

            <tbody>
              {data.map((d,i)=>(
                <tr key={i}>
                  <td>{d.name}</td>
                  <td>{d.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}