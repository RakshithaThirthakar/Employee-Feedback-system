// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!username || !password) {
//       alert("Please fill in both username and password.");
//       return;
//     }

//     try {
//       localStorage.clear(); // Clear previous session

//       const response = await axios.post("http://localhost:5000/api/login", {
//         username,
//         password,
//       });

//       const user = response.data.user; // ✅ FIXED: correctly access the user object
//       localStorage.setItem("user", JSON.stringify(user));

//       if (user.role.toLowerCase() === "manager") {
//         navigate("/manager");
//       } else {
//         navigate("/employee");
//       }
//     } catch (err) {
//       alert("🚫 Invalid username or password. Please try again.");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#f0f4ff",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       }}
//     >
//       <div
//         style={{
//           background: "white",
//           padding: "3rem",
//           borderRadius: "16px",
//           boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//           width: "400px",
//         }}
//       >
//         <h1
//           style={{
//             textAlign: "center",
//             color: "#1E3A8A",
//             marginBottom: "2rem",
//             fontWeight: "bold",
//             fontSize: "4rem",
//           }}
//         >
//           Welcome Back!
//         </h1>

//         <div style={{ marginBottom: "1.5rem" }}>
//           <label
//             style={{
//               display: "block",
//               marginBottom: "0.5rem",
//               fontWeight: "600",
//               color: "#1E3A8A",
//             }}
//           >
//             Username
//           </label>
//           <input
//             type="text"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "0.75rem",
//               borderRadius: "8px",
//               border: "1px solid #cbd5e1",
//               outline: "none",
//               fontSize: "1rem",
//             }}
//           />
//         </div>

//         <div style={{ marginBottom: "2rem" }}>
//           <label
//             style={{
//               display: "block",
//               marginBottom: "0.5rem",
//               fontWeight: "600",
//               color: "#1E3A8A",
//             }}
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "0.75rem",
//               borderRadius: "8px",
//               border: "1px solid #cbd5e1",
//               outline: "none",
//               fontSize: "1rem",
//             }}
//           />
//         </div>

//         <button
//           onClick={handleLogin}
//           style={{
//             width: "100%",
//             backgroundColor: "#1E3A8A",
//             color: "white",
//             padding: "0.75rem",
//             borderRadius: "10px",
//             fontSize: "1.1rem",
//             border: "none",
//             cursor: "pointer",
//             transition: "background 0.3s",
//           }}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#2b49a1")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#1E3A8A")}
//         >
//           Login
//         </button>

//         <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#6b7280" }}>
//           Don't have an account?{" "}
//           <a href="/signup" style={{ color: "#1E3A8A", fontWeight: "bold" }}>
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;




import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const API = process.env.REACT_APP_API_URL;
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    try {
      localStorage.clear(); // Clear previous session

      const response = await axios.post(`${API}/login`, {
        username,
        password,
      }, {
        withCredentials: true
      });

      const user = response.data.user; // ✅ FIXED: correctly access the user object
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role.toLowerCase() === "manager") {
        navigate("/manager");
      } else {
        navigate("/employee");
      }
    } catch (err) {
      alert("🚫 Invalid username or password. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f4ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem", // ✅ added for smaller screens
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <style>
        {`
          @media (max-width: 480px) {
            h1.login-heading {
              font-size: 2.5rem !important;
            }
          }
        `}
      </style>

      <div
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          width: "100%",           // ✅ responsive
          maxWidth: "400px",       // ✅ limit on desktop
        }}
      >
        <h1
          className="login-heading"
          style={{
            textAlign: "center",
            color: "#1E3A8A",
            marginBottom: "2rem",
            fontWeight: "bold",
            fontSize: "4rem", // Kept same, adjusted via media query
          }}
        >
          
        </h1>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "#1E3A8A",
            }}
          >
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              outline: "none",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600",
              color: "#1E3A8A",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              outline: "none",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* ✅ Login button untouched */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            backgroundColor: "#1E3A8A",
            color: "white",
            padding: "0.75rem",
            borderRadius: "10px",
            fontSize: "1.1rem",
            border: "none",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2b49a1")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1E3A8A")}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#6b7280",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/signup"
            style={{
              color: "#1E3A8A",
              fontWeight: "bold",
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
