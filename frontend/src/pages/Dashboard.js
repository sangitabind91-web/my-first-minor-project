// // import "./css/CandidateDashboard.css";

// // const candidates = [
// //   { name: "Ajay Panday", party:"Communist Party of India" },
// //   { name: "Harital Singh", party:"Bharatiya Jana Sangh" },
// //   { name: "Sunita Agraval", party:"Scheduled Castes Federation" },
// //   { name: "Kavita Yadav", party:"Ram Rajya Parishad" },
// //   { name: "Suresh Mishra", party:"Hindu Mahasabha" }
// // ];

// // export default function Dashboard() {
// //   const user = JSON.parse(localStorage.getItem("user"));

// //   const voteNow = async (name) => {
// //     const res = await fetch("http://localhost:5000/api/vote/cast", {
// //       method:"POST",
// //       headers:{"Content-Type":"application/json"},
// //       body: JSON.stringify({
// //         userid:user.userid,
// //         candidateName:name
// //       })
// //     });

// //     const data = await res.json();
// //     alert(data.message);

// //     user.voted = true;
// //     localStorage.setItem("user", JSON.stringify(user));
// //   };

// //   return (
// //     <div className="dashboard">
// //       <h2>Vote</h2>

// //       {candidates.map(c=>(
// //         <div key={c.name}>
// //           <h3>{c.name}</h3>
// //           <button onClick={()=>voteNow(c.name)}>Vote</button>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import "./css/CandidateDashboard.css";

// export default function Dashboard() {

//   const [search, setSearch] = useState("");

//   const elections = [
//     {
//       title: "Indian National Congress",
//       start: "01/01/24",
//       end: "05/01/24",
//       status: "Completed"
//     },
//     {
//       title: "Socialist Party",
//       start: "02/01/24",
//       end: "06/01/24",
//       status: "Running"
//     },
//     {
//       title: "Bharatiya Jana Sangh",
//       start: "03/01/24",
//       end: "07/01/24",
//       status: "Building"
//     }
//   ];

//   return (
//     <div className="main-container">

//       {/* 🔵 NAVBAR */}
//       <div className="topbar">
//         <h2>Online Voting</h2>
//         <div className="nav-right">
//           <span>Dashboard</span>
//           <span>Settings</span>
//           <span>User</span>
//         </div>
//       </div>

//       {/* 🔷 HEADER */}
//       <div className="header">
//         <h1>Dashboard</h1>
//         <button className="new-btn">+ New Election</button>
//       </div>

//       {/* 🔍 SEARCH + FILTER */}
//       <div className="controls">
//         <input
//           type="text"
//           placeholder="Search elections..."
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select>
//           <option>Filter by Status</option>
//           <option>Completed</option>
//           <option>Running</option>
//           <option>Building</option>
//         </select>
//       </div>

//       {/* 📊 TABLE */}
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {elections
//             .filter(e =>
//               e.title.toLowerCase().includes(search.toLowerCase())
//             )
//             .map((e, i) => (
//               <tr key={i}>
//                 <td>{e.title}</td>
//                 <td>{e.start}</td>
//                 <td>{e.end}</td>
//                 <td>
//                   <span className={`status ${e.status.toLowerCase()}`}>
//                     {e.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>

//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import "./css/CandidateDashboard.css";

// export default function Dashboard() {

//   const [candidates, setCandidates] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     fetch("http://localhost:5000/api/result")
//       .then(res => res.json())
//       .then(setCandidates);
//   }, []);

//   const voteNow = async (name) => {

//     if (user.voted) {
//       alert("You already voted");
//       return;
//     }

//     const res = await fetch("http://localhost:5000/api/vote/cast", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userid: user.userid,
//         candidateName: name
//       })
//     });

//     const data = await res.json();
//     alert(data.message);

//     user.voted = true;
//     localStorage.setItem("user", JSON.stringify(user));

//     window.location.reload();
//   };

//   return (
//     <div className="main-container">

//       {/* 🔵 NAVBAR */}
//       <div className="topbar">
//         <h2>Online Voting</h2>
//         <div className="nav-right">
//           <span>Dashboard</span>
//           <span>Result</span>
//         </div>
//       </div>

//       {/* 🔷 HEADER */}
//       <div className="header">
//         <h1>Candidate Dashboard</h1>
//       </div>

//       {/* 📊 TABLE */}
//       <table>
//         <thead>
//           <tr>
//             <th>Candidate Name</th>
//             <th>Party</th>
//             <th>Votes</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {candidates.map((c, i) => (
//             <tr key={i}>
//               <td>{c.name}</td>
//               <td>{c.party}</td>
//               <td>{c.votes}</td>

//               <td>
//                 {!user.voted ? (
//                   <button onClick={() => voteNow(c.name)}>
//                     Vote
//                   </button>
//                 ) : (
//                   <span className="voted">Voted</span>
//                 )}
//               </td>

//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/CandidateDashboard.css";

export default function Dashboard() {

  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // 🔄 Fetch candidates
  useEffect(() => {
    fetch("http://localhost:5000/api/result")
      .then(res => res.json())
      .then(data => {
        console.log("Candidates:", data);
        setCandidates(data);
      })
      .catch(err => console.log(err));
  }, []);

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // 🗳 Vote
  const voteNow = async (name) => {

    if (!user.userid) {
      alert("Please login again");
      return;
    }

    if (user.voted) {
      alert("You already voted");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/vote/cast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid: user.userid,
          candidateName: name
        })
      });

      const data = await res.json();
      alert(data.message);

      const updatedUser = { ...user, voted: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      window.location.reload();

    } catch (err) {
      alert("Vote failed");
    }
  };

  return (
    <div className="main-container">

      {/* 🔵 NAVBAR */}
      <div className="topbar">
        <h2>Online Voting</h2>

        <div className="nav-right">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/user-dashboard">User Dashboard</Link>
          <Link to="/result">Result</Link>
          <Link to="/admin">Admin</Link>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* 🔷 HEADER */}
      <div className="header">
        <h1>Candidate Dashboard</h1>
      </div>

      {/* 📊 TABLE */}
      <table>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Party</th>
            <th>Votes</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {/* EMPTY CHECK */}
          {candidates.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No candidates found
              </td>
            </tr>
          ) : (

            candidates.map((c, i) => (
              <tr key={i}>
                <td>{c.name}</td>
                <td>{c.party}</td>
                <td>{c.votes}</td>

                <td>
                  {!user.voted ? (
                    <button onClick={() => voteNow(c.name)}>
                      Vote
                    </button>
                  ) : (
                    <span className="voted">Voted</span>
                  )}
                </td>

              </tr>
            ))

          )}
        </tbody>
      </table>

    </div>
  );
}