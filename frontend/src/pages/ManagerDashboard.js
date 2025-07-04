// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

// function ManagerDashboard() {
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [newFeedback, setNewFeedback] = useState({
//     strengths: "",
//     areas_to_improve: "",
//     sentiment: "good",
//   });

//   const [ratings, setRatings] = useState({
//     communication: 0, communication_hover: 0,
//     leadership: 0, leadership_hover: 0,
//     punctuality: 0, punctuality_hover: 0,
//     skill: 0, skill_hover: 0,
//     teamwork: 0, teamwork_hover: 0,
//   });

//   const manager = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/employees")
//       .then(res => setEmployees(res.data))
//       .catch(() => toast.error("Could not load employees"));
//   }, []);

//   const handleFeedbackSubmit = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/feedback", {
//         employee_id: selectedEmployee.id,
//         ...newFeedback,
//         communication: ratings.communication,
//         leadership: ratings.leadership,
//         punctuality: ratings.punctuality,
//         skill: ratings.skill,
//         teamwork: ratings.teamwork,
//       });
//       toast.success("Feedback submitted successfully");
//       setNewFeedback({ strengths: "", areas_to_improve: "", sentiment: "good" });
//       setRatings({
//         communication: 0, communication_hover: 0,
//         leadership: 0, leadership_hover: 0,
//         punctuality: 0, punctuality_hover: 0,
//         skill: 0, skill_hover: 0,
//         teamwork: 0, teamwork_hover: 0,
//       });
//       setSelectedEmployee(null);
//     } catch {
//       toast.error("Failed to add feedback");
//     }
//   };

//   const handleRatingChange = (key, value) => {
//     setRatings(prev => ({
//       ...prev,
//       [key]: value,
//       [key + "_hover"]: 0,
//     }));
//   };

//   const isFeedbackValid = selectedEmployee && newFeedback.strengths && newFeedback.areas_to_improve;

//   const ratingData = [
//     { name: "Communication", value: ratings.communication },
//     { name: "Leadership", value: ratings.leadership },
//     { name: "Punctuality", value: ratings.punctuality },
//     { name: "Skill", value: ratings.skill },
//     { name: "Teamwork", value: ratings.teamwork },
//   ];

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif" }}>
//       <ToastContainer position="top-right" />
      
//       {/* Sidebar */}
//       <aside style={{ width: "250px", backgroundColor: "#1E3A8A", color: "white", padding: "2rem 1rem" }}>
//         <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin"
//              style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "1rem" }} />
//         <h2>Welcome, {manager?.username || "Manager"}</h2>
//       </aside>

//       {/* Main content */}
//       <div style={{ padding: "2rem", flex: 1 }}>
//         <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>📋 Provide Feedback</h1>

//         {/* Select Employee */}
//         <div style={{ marginBottom: "1.5rem" }}>
//           <label>Select Employee: </label>
//           <select onChange={(e) => {
//             const emp = employees.find(emp => emp.id === parseInt(e.target.value));
//             setSelectedEmployee(emp);
//           }}>
//             <option value="">-- Choose --</option>
//             {employees.map(emp => (
//               <option key={emp.id} value={emp.id}>{emp.username}</option>
//             ))}
//           </select>
//         </div>

//         {selectedEmployee && (
//           <>
//             <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", marginBottom: "2rem" }}>
//               <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
//                 <img src={selectedEmployee?.image || "https://randomuser.me/api/portraits/men/32.jpg"} alt="Employee"
//                      style={{ width: "120px", height: "120px", borderRadius: "50%", marginRight: "1.5rem" }} />
//                 <h2>{selectedEmployee.username}</h2>
//               </div>

//               <textarea
//                 placeholder="Strengths"
//                 value={newFeedback.strengths}
//                 onChange={(e) => setNewFeedback({ ...newFeedback, strengths: e.target.value })}
//                 style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
//               />
//               <textarea
//                 placeholder="Areas to Improve"
//                 value={newFeedback.areas_to_improve}
//                 onChange={(e) => setNewFeedback({ ...newFeedback, areas_to_improve: e.target.value })}
//                 style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
//               />
//               <select
//                 value={newFeedback.sentiment}
//                 onChange={(e) => setNewFeedback({ ...newFeedback, sentiment: e.target.value })}
//                 style={{ marginBottom: "0.5rem", padding: "0.5rem" }}
//               >
//                 <option value="very_bad">😠 Very Bad</option>
//                 <option value="bad">😟 Bad</option>
//                 <option value="neutral">😐 Neutral</option>
//                 <option value="good">🙂 Good</option>
//                 <option value="excellent">😄 Excellent</option>
//               </select>

//               <button
//                 onClick={handleFeedbackSubmit}
//                 disabled={!isFeedbackValid}
//                 style={{
//                   backgroundColor: isFeedbackValid ? "#1E3A8A" : "#9ca3af",
//                   color: "white", padding: "0.5rem 1rem", borderRadius: "5px", border: "none",
//                   cursor: isFeedbackValid ? "pointer" : "not-allowed"
//                 }}
//               >
//                 Submit Feedback
//               </button>
//             </div>

//             {/* Ratings and Chart */}
//             <div style={{ display: "flex", gap: "2rem" }}>
//               {/* Ratings */}
//               <div style={{ flex: 1, background: "#fff", padding: "1.5rem", borderRadius: "12px" }}>
//                 <h3>⭐ Rate the Employee</h3>
//                 {["communication", "leadership", "punctuality", "skill", "teamwork"].map((key) => (
//                   <div key={key} style={{ marginBottom: "2rem" }}>
//                     <div style={{ marginBottom: "0.5rem", textTransform: "capitalize" }}>{key}</div>
//                     <div onMouseLeave={() => setRatings(prev => ({ ...prev, [key + "_hover"]: 0 }))} style={{ display: "flex", gap: "3px" }}>
//                       {Array.from({ length: 10 }, (_, i) => (
//                         <div key={i}
//                              onMouseEnter={() => setRatings(prev => ({ ...prev, [key + "_hover"]: i + 1 }))}
//                              onClick={() => handleRatingChange(key, i + 1)}
//                              style={{
//                                width: "40px", height: "6px",
//                                backgroundColor: (ratings[key + "_hover"] || ratings[key]) >= i + 1 ? "#1E3A8A" : "#e5e7eb",
//                                cursor: "pointer"
//                              }} />
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pie Chart */}
//               <div style={{ flex: 1, background: "#fff", padding: "1.5rem", borderRadius: "12px" }}>
//                 <h4 style={{ textAlign: "center" }}>📊 Rating Summary</h4>
//                 <PieChart width={400} height={400}>
//                   <Pie
//                     data={ratingData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={120}
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     labelLine={false}
//                   >
//                     {ratingData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ManagerDashboard;




























// perfectly working code idu

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";
// import { useNavigate } from "react-router-dom";   

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

// function ManagerDashboard() {
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const navigate = useNavigate();
//   const [newFeedback, setNewFeedback] = useState({
//     strengths: "",
//     areas_to_improve: "",
//     sentiment: "positive",
//   });

//   const [ratings, setRatings] = useState({
//     communication: 0, communication_hover: 0,
//     leadership: 0, leadership_hover: 0,
//     punctuality: 0, punctuality_hover: 0,
//     skill: 0, skill_hover: 0,
//     teamwork: 0, teamwork_hover: 0,
//   });

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/employees")
//       .then(res => setEmployees(res.data))
//       .catch(() => alert("Could not load employees"));
//   }, []);
//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };


//   const handleFeedbackSubmit = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/feedback", {
//         employee_id: selectedEmployee.id,
//         ...newFeedback,
//         communication: ratings.communication,
//         leadership: ratings.leadership,
//         punctuality: ratings.punctuality,
//         skill: ratings.skill,
//         teamwork: ratings.teamwork,
//       });
//       setNewFeedback({ strengths: "", areas_to_improve: "", sentiment: "positive" });
//       alert("Feedback and ratings submitted successfully");
//     } catch {
//       alert("Failed to add feedback");
//     }
//   };

//   const handleRatingChange = (key, value) => {
//     setRatings(prev => ({
//       ...prev,
//       [key]: value,
//       [key + "_hover"]: 0,
//     }));
//   };

//   const ratingData = [
//     { name: "Communication", value: ratings.communication },
//     { name: "Leadership", value: ratings.leadership },
//     { name: "Punctuality", value: ratings.punctuality },
//     { name: "Skill", value: ratings.skill },
//     { name: "Teamwork", value: ratings.teamwork },
//   ];

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
//       {/* Sidebar */}
//       <aside style={{
//         width: "250px", backgroundColor: "#1E3A8A", color: "white",
//         padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center"
//       }}>
//         <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin"
//           style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "1rem", boxShadow: "0 0 8px rgba(0,0,0,0.2)" }} />
//         <h2 style={{ fontSize: "1.2rem", marginBottom: "2rem", fontWeight: "bold" }}>
//           Welcome, {user?.username || "Manager"}
//         </h2>
//         <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
//           {["View Profile", "Team", "Company", "Help", "Logout"].map((item, index) => (
//             <a
//               key={index}
//               href="#"
//               onClick={item === "Logout" ? handleLogout : (e) => e.preventDefault()}
//               style={{
//                 color: "white",
//                 textDecoration: "none",
//                 padding: "0.75rem 1rem",
//                 borderRadius: "0.5rem",
//                 fontWeight: "500",
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = "scale(1.05)";
//                 e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "scale(1)";
//                 e.currentTarget.style.backgroundColor = "transparent";
//               }}
//             >
//               {item}
//             </a>
//           ))}
//         </nav>
//       </aside>
//       {/* Main Content */}
//       <div style={{ padding: "2rem", flex: 1, backgroundColor: "#f3f4f6" }}>
//         <h1 style={{ fontSize: "2.4rem", marginBottom: "1.5rem", fontWeight: "bold", color: "#1E3A8A" }}>
//           📋 Provide Feedback
//         </h1>

//         {/* Employee Selection */}
//         <div style={{ marginBottom: "1.5rem" }}>
//           <label style={{ fontWeight: "bold" }}>Select Employee: </label>
//           <select onChange={(e) => {
//             const emp = employees.find(emp => emp.id === parseInt(e.target.value));
//             setSelectedEmployee(emp);
//           }}>
//             <option value="">-- Choose --</option>
//             {employees.map(emp => (
//               <option key={emp.id} value={emp.id}>{emp.username}</option>
//             ))}
//           </select>
//         </div>

//         {selectedEmployee && (
//           <>
//             {/* Feedback Form */}
//             <div style={{
//               background: "#fff", padding: "1.5rem", borderRadius: "12px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.05)", marginBottom: "2rem"
//             }}>
//               <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
//                 <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Employee"
//                   style={{ width: "120px", height: "120px", borderRadius: "50%", marginRight: "1.5rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }} />
//                 <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#111827" }}>{selectedEmployee.username}</h2>
//               </div>
//               <textarea
//                 placeholder="Strengths"
//                 value={newFeedback.strengths}
//                 onChange={(e) => setNewFeedback({ ...newFeedback, strengths: e.target.value })}
//                 style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
//               />
//               <textarea
//                 placeholder="Areas to Improve"
//                 value={newFeedback.areas_to_improve}
//                 onChange={(e) => setNewFeedback({ ...newFeedback, areas_to_improve: e.target.value })}
//                 style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
//               />
//               <select
//                 value={newFeedback.sentiment}
//                 onChange={(e) => setNewFeedback({ ...newFeedback, sentiment: e.target.value })}
//                 style={{ marginBottom: "0.5rem", padding: "0.5rem" }}
//               >
//                 <option value="positive">Positive</option>
//                 <option value="neutral">Neutral</option>
//                 <option value="negative">Negative</option>
//               </select>
//               <div>
//                 <button onClick={handleFeedbackSubmit}
//                   style={{ marginTop: "0.5rem", backgroundColor: "#1E3A8A", color: "white", padding: "0.5rem 1.2rem", borderRadius: "5px", border: "none" }}>
//                   Submit Feedback & Ratings
//                 </button>
//               </div>
//             </div>

//             {/* Ratings & Chart Section */}
//             <div style={{ display: "flex", gap: "2rem" }}>
//               {/* Ratings */}
//               <div style={{
//                 flex: 1, background: "#fff", padding: "1.5rem", borderRadius: "12px",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
//               }}>
//                 <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>⭐ Rate the Employee</h3>
//                 {["communication", "leadership", "punctuality", "skill", "teamwork"].map((key) => (
//                   <div key={key} style={{ marginBottom: "2rem" }}>
//                     <div style={{ marginBottom: "0.5rem", textTransform: "capitalize", fontWeight: 600 }}>{key}</div>
//                     <div
//                       onMouseLeave={() => setRatings(prev => ({ ...prev, [key + "_hover"]: 0 }))}
//                       style={{ display: "flex", alignItems: "flex-end", gap: "2px", marginBottom: "0.3rem" }}
//                     >
//                       {Array.from({ length: 10 }, (_, i) => (
//                         <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
//                           <span style={{ fontSize: "0.7rem", fontWeight: "500", color: "#374151" }}>{i + 1}</span>
//                           <div
//                             onMouseEnter={() => setRatings(prev => ({ ...prev, [key + "_hover"]: i + 1 }))}
//                             onClick={() => handleRatingChange(key, i + 1)}
//                             style={{
//                               width: "48px",
//                               height: "6px",
//                               backgroundColor: (ratings[key + "_hover"] || ratings[key]) >= i + 1 ? "#1E3A8A" : "#d1d5db",
//                               cursor: "pointer",
//                               transition: "0.2s ease",
//                               borderRadius: "3px"
//                             }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div style={{
//                       display: "flex", justifyContent: "space-between", width: "520px",
//                       fontSize: "0.8rem", marginTop: "-4px", color: "#6b7280"
//                     }}>
//                       <span>Very Bad (0)</span>
//                       <span>Very Good (10)</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pie Chart */}
//               <div style={{
//                 flex: 1, background: "#fff", padding: "1.5rem", borderRadius: "12px",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", alignItems: "center"
//               }}>
//                 <h4 style={{ fontWeight: "600", marginBottom: "1rem", fontSize: "1.1rem", color: "#1e3a8a" }}>
//                   📊 Employee Rating Summary
//                 </h4>
//                 <PieChart width={500} height={500}>
//                   <Pie
//                     data={ratingData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={150}
//                     fill="#8884d8"
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     labelLine={false}
//                   >
//                     {ratingData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ManagerDashboard;











// looks like its working

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";
// import { useNavigate } from "react-router-dom";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

// function ManagerDashboard() {
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const navigate = useNavigate();
//   const [newFeedback, setNewFeedback] = useState({
//     strengths: "",
//     areas_to_improve: "",
//     sentiment: "positive",
//   });

//   const [ratings, setRatings] = useState({
//     communication: 0, communication_hover: 0,
//     leadership: 0, leadership_hover: 0,
//     punctuality: 0, punctuality_hover: 0,
//     skill: 0, skill_hover: 0,
//     teamwork: 0, teamwork_hover: 0,
//   });

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/employees")
//       .then(res => setEmployees(res.data))
//       .catch(() => alert("Could not load employees"));
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const handleFeedbackSubmit = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/feedback", {
//         employee_id: selectedEmployee.id,
//         ...newFeedback,
//         communication: ratings.communication,
//         leadership: ratings.leadership,
//         punctuality: ratings.punctuality,
//         skill: ratings.skill,
//         teamwork: ratings.teamwork,
//       });
//       setNewFeedback({ strengths: "", areas_to_improve: "", sentiment: "positive" });
//       alert("Feedback and ratings submitted successfully");
//     } catch {
//       alert("Failed to add feedback");
//     }
//   };

//   const handleRatingChange = (key, value) => {
//     setRatings(prev => ({
//       ...prev,
//       [key]: value,
//       [key + "_hover"]: 0,
//     }));
//   };

//   const ratingData = [
//     { name: "Communication", value: ratings.communication },
//     { name: "Leadership", value: ratings.leadership },
//     { name: "Punctuality", value: ratings.punctuality },
//     { name: "Skill", value: ratings.skill },
//     { name: "Teamwork", value: ratings.teamwork },
//   ];

//   return (
//     <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
//       <aside style={{
//         width: "250px", backgroundColor: "#1E3A8A", color: "white",
//         padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center"
//       }}>
//         <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin"
//           style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "1rem", boxShadow: "0 0 8px rgba(0,0,0,0.2)" }} />
//         <h2 style={{ fontSize: "1.2rem", marginBottom: "2rem", fontWeight: "bold" }}>
//           Welcome, {user?.username || "Manager"}
//         </h2>
//         <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
//           {["View Profile", "Team", "Company", "Help", "Logout"].map((item, index) => (
//             <a
//               key={index}
//               href="#"
//               onClick={item === "Logout" ? handleLogout : (e) => e.preventDefault()}
//               style={{
//                 color: "white",
//                 textDecoration: "none",
//                 padding: "0.75rem 1rem",
//                 borderRadius: "0.5rem",
//                 fontWeight: "500",
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = "scale(1.05)";
//                 e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "scale(1)";
//                 e.currentTarget.style.backgroundColor = "transparent";
//               }}
//             >
//               {item}
//             </a>
//           ))}
//         </nav>
//       </aside>

//       <div style={{ padding: "2rem", flex: 1, backgroundColor: "#f3f4f6" }}>
//         <h1 style={{ fontSize: "2.4rem", marginBottom: "1.5rem", fontWeight: "bold", color: "#1E3A8A" }}>
//           📋 Provide Feedback
//         </h1>

//         <div style={{ marginBottom: "1.5rem" }}>
//           <label style={{ fontWeight: "bold" }}>Select Employee: </label>
//           <select onChange={(e) => {
//             const emp = employees.find(emp => emp.id === parseInt(e.target.value));
//             setSelectedEmployee(emp);
//           }}>
//             <option value="">-- Choose --</option>
//             {employees.map(emp => (
//               <option key={emp.id} value={emp.id}>{emp.username}</option>
//             ))}
//           </select>
//         </div>

//         {selectedEmployee && (
//           <>
//             <div style={{
//               background: "#fff", padding: "1.5rem", borderRadius: "12px",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.05)", marginBottom: "2rem"
//             }}>
//               <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
//                 <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Employee"
//                   style={{ width: "120px", height: "120px", borderRadius: "50%", marginRight: "1.5rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }} />
//                 <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#111827" }}>{selectedEmployee.username}</h2>
//               </div>
//               <textarea placeholder="Strengths" value={newFeedback.strengths} onChange={(e) => setNewFeedback({ ...newFeedback, strengths: e.target.value })} style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }} />
//               <textarea placeholder="Areas to Improve" value={newFeedback.areas_to_improve} onChange={(e) => setNewFeedback({ ...newFeedback, areas_to_improve: e.target.value })} style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }} />
//               <select value={newFeedback.sentiment} onChange={(e) => setNewFeedback({ ...newFeedback, sentiment: e.target.value })} style={{ marginBottom: "0.5rem", padding: "0.5rem" }}>
//                 <option value="positive">Positive</option>
//                 <option value="neutral">Neutral</option>
//                 <option value="negative">Negative</option>
//               </select>
//               <div>
//                 <button onClick={handleFeedbackSubmit} style={{ marginTop: "0.5rem", backgroundColor: "#1E3A8A", color: "white", padding: "0.5rem 1.2rem", borderRadius: "5px", border: "none" }}>
//                   Submit Feedback & Ratings
//                 </button>
//               </div>
//             </div>

//             {/* Ratings & Chart Section */}
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
//               <div style={{
//                 flex: "1 1 500px", background: "#fff", padding: "1.5rem", borderRadius: "12px",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)", minWidth: "300px"
//               }}>
//                 <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>⭐ Rate the Employee</h3>
//                 {["communication", "leadership", "punctuality", "skill", "teamwork"].map((key) => (
//                   <div key={key} style={{ marginBottom: "2rem" }}>
//                     <div style={{ marginBottom: "0.5rem", textTransform: "capitalize", fontWeight: 600 }}>{key}</div>
//                     <div
//                       onMouseLeave={() => setRatings(prev => ({ ...prev, [key + "_hover"]: 0 }))}
//                       style={{ display: "flex", alignItems: "flex-end", gap: "2px", flexWrap: "wrap", maxWidth: "100%" }}
//                     >
//                       {Array.from({ length: 10 }, (_, i) => (
//                         <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
//                           <span style={{ fontSize: "0.7rem", fontWeight: "500", color: "#374151" }}>{i + 1}</span>
//                           <div
//                             onMouseEnter={() => setRatings(prev => ({ ...prev, [key + "_hover"]: i + 1 }))}
//                             onClick={() => handleRatingChange(key, i + 1)}
//                             style={{
//                               width: "36px",
//                               height: "6px",
//                               backgroundColor: (ratings[key + "_hover"] || ratings[key]) >= i + 1 ? "#1E3A8A" : "#d1d5db",
//                               cursor: "pointer",
//                               transition: "0.2s ease",
//                               borderRadius: "3px"
//                             }}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                     <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginTop: "-4px", color: "#6b7280" }}>
//                       <span>Very Bad (0)</span>
//                       <span>Very Good (10)</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div style={{
//                 flex: "1 1 400px", background: "#fff", padding: "1.5rem", borderRadius: "12px",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", alignItems: "center"
//               }}>
//                 <h4 style={{ fontWeight: "600", marginBottom: "1rem", fontSize: "1.1rem", color: "#1e3a8a" }}>
//                   📊 Employee Rating Summary
//                 </h4>
//                 <PieChart width={300} height={300}>
//                   <Pie
//                     data={ratingData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={100}
//                     fill="#8884d8"
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     labelLine={false}
//                   >
//                     {ratingData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ManagerDashboard;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

function ManagerDashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [newFeedback, setNewFeedback] = useState({
    strengths: "",
    areas_to_improve: "",
    sentiment: "positive",
  });

  const [ratings, setRatings] = useState({
    communication: 0, communication_hover: 0,
    leadership: 0, leadership_hover: 0,
    punctuality: 0, punctuality_hover: 0,
    skill: 0, skill_hover: 0,
    teamwork: 0, teamwork_hover: 0,
  });

  const API = process.env.REACT_APP_API_URL; // ✅ Added

  const user = JSON.parse(localStorage.getItem("user"));
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    axios.get(`${API}/employees`)
      .then(res => setEmployees(res.data))
      .catch(() => alert("Could not load employees"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleFeedbackSubmit = async () => {
    try {
      await axios.post(`${API}/feedback`, {
        employee_id: selectedEmployee.id,
        ...newFeedback,
        communication: ratings.communication,
        leadership: ratings.leadership,
        punctuality: ratings.punctuality,
        skill: ratings.skill,
        teamwork: ratings.teamwork,
      });
      setNewFeedback({ strengths: "", areas_to_improve: "", sentiment: "positive" });
      alert("Feedback and ratings submitted successfully");
    } catch {
      alert("Failed to add feedback");
    }
  };

  const handleRatingChange = (key, value) => {
    setRatings(prev => ({
      ...prev,
      [key]: value,
      [key + "_hover"]: 0,
    }));
  };

  const ratingData = [
    { name: "Communication", value: ratings.communication },
    { name: "Leadership", value: ratings.leadership },
    { name: "Punctuality", value: ratings.punctuality },
    { name: "Skill", value: ratings.skill },
    { name: "Teamwork", value: ratings.teamwork },
  ];

  const ratingDescriptions = {
    communication: "Ability to convey ideas and information clearly and effectively.",
    leadership: "Capability to guide and inspire others to achieve common goals.",
    punctuality: "Consistency in meeting deadlines and being on time.",
    skill: "Proficiency in required tasks and technical knowledge.",
    teamwork: "Collaboration and cooperation within the team environment."
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <aside style={{
        width: "250px", backgroundColor: "#1E3A8A", color: "white",
        padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center"
      }}>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin"
          style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "1rem", boxShadow: "0 0 8px rgba(0,0,0,0.2)" }} />
        <h2 style={{ fontSize: "1.2rem", marginBottom: "2rem", fontWeight: "bold" }}>
          Welcome, {user?.username || "Manager"}
        </h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
          {["View Profile", "Team", "Company", "Help", "Logout"].map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={item === "Logout" ? handleLogout : (e) => e.preventDefault()}
              style={{
                color: "white",
                textDecoration: "none",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                fontWeight: "500",
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

      <div style={{ padding: "2rem", flex: 1, backgroundColor: "#f3f4f6" }}>
        <h1 style={{ fontSize: "2.4rem", marginBottom: "1.5rem", fontWeight: "bold", color: "#1E3A8A" }}>
          📋 Provide Feedback
        </h1>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontWeight: "bold" }}>Select Employee: </label>
          <select onChange={(e) => {
            const emp = employees.find(emp => emp.id === parseInt(e.target.value));
            setSelectedEmployee(emp);
          }}>
            <option value="">-- Choose --</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.username}</option>
            ))}
          </select>
        </div>

        {selectedEmployee && (
          <>
            <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Employee"
                  style={{ width: "120px", height: "120px", borderRadius: "50%", marginRight: "1.5rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }} />
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#111827" }}>{selectedEmployee.username}</h2>
              </div>
              <textarea placeholder="Strengths" value={newFeedback.strengths} onChange={(e) => setNewFeedback({ ...newFeedback, strengths: e.target.value })} style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }} />
              <textarea placeholder="Areas to Improve" value={newFeedback.areas_to_improve} onChange={(e) => setNewFeedback({ ...newFeedback, areas_to_improve: e.target.value })} style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }} />
              <select value={newFeedback.sentiment} onChange={(e) => setNewFeedback({ ...newFeedback, sentiment: e.target.value })} style={{ marginBottom: "0.5rem", padding: "0.5rem" }}>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
              <div>
                <button onClick={handleFeedbackSubmit} style={{ marginTop: "0.5rem", backgroundColor: "#1E3A8A", color: "white", padding: "0.5rem 1.2rem", borderRadius: "5px", border: "none" }}>
                  Submit Feedback & Ratings
                </button>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between" }}>
              <div style={{ flex: "1 1 500px", background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", minWidth: "300px" }}>
                <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>⭐ Rate the Employee</h3>
                {Object.keys(ratingDescriptions).map((key) => (
                  <div key={key} style={{ marginBottom: "2.5rem" }}>
                    <div style={{ marginBottom: "0.5rem", textTransform: "capitalize", fontWeight: 600 }}>{key}</div>
                    <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginBottom: "0.2rem" }}>
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} style={{ width: "calc(min(6vw, 60px))", textAlign: "center", fontSize: "0.75rem", color: "#4b5563" }}>
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div
                      onMouseLeave={() => setRatings(prev => ({ ...prev, [key + "_hover"]: 0 }))}
                      style={{ display: "flex", alignItems: "flex-end", gap: "4px", justifyContent: "center" }}
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                          <div
                            onMouseEnter={() => setRatings(prev => ({ ...prev, [key + "_hover"]: i + 1 }))}
                            onClick={() => handleRatingChange(key, i + 1)}
                            style={{
                              width: "calc(min(6vw, 55px))",
                              height: "6px",
                              backgroundColor: (ratings[key + "_hover"] || ratings[key]) >= i + 1 ? "#1E3A8A" : "#d1d5db",
                              cursor: "pointer",
                              transition: "0.2s ease",
                              borderRadius: "3px"
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem", fontSize: "0.75rem", color: "#6b7280" }}>
                      <span>Very Bad (0)</span>
                      <div style={{ flex: 1 }} />
                      <span style={{ textAlign: "right", width: "calc(min(6vw, 60px))" }}>Very Good (10)</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ flex: "1 1 400px", background: "#fff", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", alignItems: "center", minWidth: "300px" }}>
                <h4 style={{ fontWeight: "600", marginBottom: "1rem", fontSize: "1.1rem", color: "#1e3a8a" }}>
                  📊 Employee Rating Summary
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ratingData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      fill="#8884d8"
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ManagerDashboard;
