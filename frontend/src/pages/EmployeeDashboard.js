// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

// const sentimentMap = {
//   very_bad: "😠 Very Bad",
//   bad: "😟 Bad",
//   neutral: "😐 Neutral",
//   good: "🙂 Good",
//   excellent: "😄 Excellent",
// };

// function EmployeeDashboard({ employeeId }) {
//   const [employee, setEmployee] = useState(null);
//   const [feedback, setFeedback] = useState(null);
//   const [ratings, setRatings] = useState(null);

//   const loggedInUser = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!employeeId) return;
//     axios
//       .get(`http://localhost:5000/api/employee/${employeeId}/latest-feedback`)
//       .then((res) => {
//         setEmployee(res.data.employee);
//         setFeedback({
//           strengths: res.data.strengths,
//           areas_to_improve: res.data.areas_to_improve,
//           sentiment: res.data.sentiment,
//         });
//         setRatings({
//           communication: res.data.communication,
//           leadership: res.data.leadership,
//           punctuality: res.data.punctuality,
//           skill: res.data.skill,
//           teamwork: res.data.teamwork,
//         });
//       })
//       .catch(() => alert("Failed to load employee data"));
//   }, [employeeId]);

//   const ratingData = ratings
//     ? Object.entries(ratings).map(([name, value]) => ({
//         name: name.charAt(0).toUpperCase() + name.slice(1),
//         value,
//       }))
//     : [];

//   return (
//     <div
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       }}
//     >
//       {/* Sidebar */}
//       <aside
//         style={{
//           width: "250px",
//           backgroundColor: "#1E3A8A",
//           color: "white",
//           padding: "2rem 1rem",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <img
//           src="https://randomuser.me/api/portraits/women/45.jpg"
//           alt="Employee"
//           style={{
//             width: "100px",
//             height: "100px",
//             borderRadius: "50%",
//             marginBottom: "1rem",
//             boxShadow: "0 0 8px rgba(0,0,0,0.2)",
//           }}
//         />
//         <h2
//           style={{
//             fontSize: "1.2rem",
//             marginBottom: "2rem",
//             fontWeight: "bold",
//           }}
//         >
//           Welcome, {loggedInUser?.username || "Employee"}
//         </h2>
//         <nav
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "1rem",
//             width: "100%",
//           }}
//         >
//           {["My Feedback", "Team", "Help", "Logout"].map((item, index) => (
//             <a
//               key={index}
//               href="#"
//               style={{
//                 color: "white",
//                 textDecoration: "none",
//                 padding: "0.75rem 1rem",
//                 borderRadius: "0.5rem",
//                 fontWeight: "500",
//               }}
//             >
//               {item}
//             </a>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div
//         style={{
//           padding: "2rem",
//           flex: 1,
//           backgroundColor: "#f3f4f6",
//         }}
//       >
//         <h1
//           style={{
//             fontSize: "2rem",
//             marginBottom: "1.5rem",
//             fontWeight: "bold",
//             color: "#1E3A8A",
//           }}
//         >
//           📋 Feedback Summary 
//         </h1>

//         {feedback && ratings ? (
//           <>
//             {/* Feedback Section */}
//             <div
//               style={{
//                 background: "#fff",
//                 padding: "1.5rem",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                 marginBottom: "2rem",
//               }}
//             >
//               <h2
//                 style={{
//                   fontSize: "1.5rem",
//                   fontWeight: "600",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 📝 Feedback
//               </h2>
//               <p>
//                 <strong>Strengths:</strong> {feedback.strengths}
//               </p>
//               <p>
//                 <strong>Areas to Improve:</strong> {feedback.areas_to_improve}
//               </p>
//               <p>
//                 <strong>Sentiment:</strong>{" "}
//                 {sentimentMap[feedback.sentiment] || feedback.sentiment}
//               </p>
//             </div>

//             {/* Ratings & Chart */}
//             <div style={{ display: "flex", gap: "2rem" }}>
//               {/* Ratings Table */}
//               <div
//                 style={{
//                   flex: 1,
//                   background: "#fff",
//                   padding: "1.5rem",
//                   borderRadius: "12px",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                 }}
//               >
//                 <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>
//                   ⭐ Ratings
//                 </h3>
//                 <ul style={{ listStyle: "none", padding: 0 }}>
//                   {Object.entries(ratings).map(([key, val]) => (
//                     <li
//                       key={key}
//                       style={{ marginBottom: "0.75rem", fontSize: "1rem" }}
//                     >
//                       <strong style={{ textTransform: "capitalize" }}>
//                         {key}:
//                       </strong>{" "}
//                       {val}/10
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Pie Chart */}
//               <div
//                 style={{
//                   flex: 1,
//                   background: "#fff",
//                   padding: "1.5rem",
//                   borderRadius: "12px",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <h4
//                   style={{
//                     fontWeight: "600",
//                     marginBottom: "1rem",
//                     fontSize: "1.1rem",
//                     color: "#1e3a8a",
//                   }}
//                 >
//                   📊 Rating Summary
//                 </h4>
//                 <PieChart width={400} height={400}>
//                   <Pie
//                     data={ratingData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={120}
//                     fill="#8884d8"
//                     label={({ name, percent }) =>
//                       `${name} ${(percent * 100).toFixed(0)}%`
//                     }
//                     labelLine={false}
//                   >
//                     {ratingData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </div>
//             </div>
//           </>
//         ) : (
//           <p>Loading feedback and ratings...</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default EmployeeDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

function EmployeeDashboard() {
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const API = process.env.REACT_APP_API_URL; // ✅ Use env variable

  useEffect(() => {
    if (!user || user.role !== "employee") return;
    axios
      .get(`${API}/employee/${user.id}/latest-feedback`)
      .then((res) => setFeedback(res.data))
      .catch((err) => console.error("Could not load feedback", err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const ratingData = feedback
    ? [
        { name: "Communication", value: feedback.communication },
        { name: "Leadership", value: feedback.leadership },
        { name: "Punctuality", value: feedback.punctuality },
        { name: "Skill", value: feedback.skill },
        { name: "Teamwork", value: feedback.teamwork },
      ]
    : [];

  const getEmoji = (sentiment) => {
    switch (sentiment) {
      case "very_bad": return "😠 Very Bad";
      case "bad": return "😟 Bad";
      case "neutral": return "😐 Neutral";
      case "good": return "🙂 Good";
      case "excellent": return "😄 Excellent";
      default: return "❓";
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: "250px", backgroundColor: "#1E3A8A", color: "white", padding: "2rem 1rem" }}>
        <img
          src="https://randomuser.me/api/portraits/women/45.jpg"
          alt="Admin"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            marginBottom: "1rem",
            boxShadow: "0 0 8px rgba(0,0,0,0.2)",
          }}
        />
        <h2 style={{ fontSize: "1.4rem", marginBottom: "2rem", fontWeight: "bold" }}>
          Welcome, {user?.username || "Employee"}
        </h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem", width: "100%" }}>
          {["View Profile", "Team", "Company", "Help", "Logout"].map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={item === "Logout" ? handleLogout : (e) => e.preventDefault()}
              style={{
                color: "white",
                textDecoration: "none",
                padding: "0.6rem 1rem",
                borderRadius: "0.5rem",
                fontWeight: "500",
                fontSize: "1rem",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ padding: "1.5rem", flex: 1, backgroundColor: "#f3f4f6" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>📝 Feedback Received</h1>

        {feedback ? (
          <>
            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <h1 style={{ fontSize: "1.5rem" }}>{user.username}</h1>
              </div>
              <p><strong>Strengths:</strong></p>
              <p>{feedback.strengths}</p>
              <p style={{ marginTop: "0.5rem" }}><strong>Areas to Improve:</strong></p>
              <p>{feedback.areas_to_improve}</p>
              <p style={{ marginTop: "0.5rem" }}><strong>Feedback:</strong> {getEmoji(feedback.sentiment)}</p>
            </div>

            {/* Ratings and Pie Chart */}
            <div
              style={{
                display: "flex",
                flexDirection: window.innerWidth < 768 ? "column" : "row",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, background: "#fff", padding: "1rem", borderRadius: "12px", minWidth: "300px" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>⭐ Your Ratings</h3>
                {ratingData.map((rating) => (
                  <div key={rating.name} style={{ marginBottom: "0.8rem" }}>
                    <div style={{ marginBottom: "0.3rem", fontSize: "1rem" }}>{rating.name}</div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ background: "#e5e7eb", height: "12px", borderRadius: "6px", flex: 1, marginRight: "10px" }}>
                        <div
                          style={{
                            width: `${(rating.value / 10) * 100}%`,
                            height: "100%",
                            background: "#1E3A8A",
                          }}
                        />
                      </div>
                      <div style={{ fontSize: "0.9rem", minWidth: "40px" }}>{rating.value}/10</div>
                    </div>
                  </div>
                ))}
              </div>

              {ratingData.length > 0 && (
                <div style={{ flex: 1, background: "#fff", padding: "1rem", borderRadius: "12px", minWidth: "300px" }}>
                  <h4 style={{ textAlign: "center", fontSize: "1.25rem" }}>📊 Rating Summary</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ratingData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {ratingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </>
        ) : (
          <p style={{ fontSize: "1.1rem" }}>No feedback available yet.</p>
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
