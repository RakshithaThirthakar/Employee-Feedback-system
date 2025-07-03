// import React from "react";
// import axios from "axios";

// function Signup() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const username = e.target.username.value;
//     const password = e.target.password.value;
//     const role = e.target.role.value;

//     try {
//       await axios.post("http://localhost:5000/api/signup", {
//         username,
//         password,
//         role,
//       });
//       alert("Signup successful! 🎉 Please login.");
//       window.location.href = "/";
//     } catch (err) {
//       alert("Signup failed. User may already exist. 🚫");
//     }
//   };

//   return (
//     <div style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh",
//       background: "#eef2ff"
//     }}>
//       <form onSubmit={handleSubmit} style={{
//         background: "#fff",
//         padding: "2rem",
//         borderRadius: "10px",
//         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//         width: "380px",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//       }}>
//         <h2 style={{
//           textAlign: "center",
//           marginBottom: "1.5rem",
//           color: "#1E3A8A",
//           fontSize: "3rem"
//         }}>
//           📝 Signup
//         </h2>

//         <label style={labelStyle}>Username</label>
//         <input name="username" required style={inputStyle} />

//         <label style={labelStyle}>Password</label>
//         <input name="password" type="password" required style={inputStyle} />

//         <label style={labelStyle}>Role</label>
//         <select name="role" required style={inputStyle}>
//           <option value="">-- Select Role --</option>
//           <option value="manager">Manager 🧑‍💼</option>
//           <option value="employee">Employee 👩‍💻</option>
//         </select>

//         <button type="submit" style={btnStyle}>Create Account</button>
//       </form>
//     </div>
//   );
// }

// const inputStyle = {
//   width: "100%",
//   padding: "0.75rem",
//   marginBottom: "1.25rem",
//   borderRadius: "6px",
//   border: "1px solid #ccc",
//   fontSize: "1rem"
// };

// const labelStyle = {
//   fontWeight: "bold",
//   fontSize: "1rem",
//   marginBottom: "0.3rem",
//   display: "block",
//   color: "#1E3A8A"
// };

// const btnStyle = {
//   width: "100%",
//   padding: "0.8rem",
//   backgroundColor: "#1E3A8A",
//   color: "white",
//   border: "none",
//   borderRadius: "6px",
//   fontWeight: "bold",
//   fontSize: "1.1rem",
//   cursor: "pointer"
// };

// export default Signup;


import React from "react";
import axios from "axios";

function Signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    try {
      await axios.post("http://localhost:5000/api/signup", {
        username,
        password,
        role,
      },
    {
  withCredentials: true
});
      alert("Signup successful! 🎉 Please login.");
      window.location.href = "/";
    } catch (err) {
      alert("Signup failed. User may already exist. 🚫");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      padding: "1rem", // 🆕 padding for mobile screens
      background: "#eef2ff"
    }}>
      <style>
        {`
          @media (max-width: 480px) {
            h2.signup-heading {
              font-size: 2rem !important;
            }
          }
        `}
      </style>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "100%",             // 🆕 fluid width
        maxWidth: "400px",         // 🆕 constraint
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <h2 className="signup-heading" style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#1E3A8A",
          fontSize: "3rem"
        }}>
          📝 Signup
        </h2>

        <label style={labelStyle}>Username</label>
        <input name="username" required style={inputStyle} />

        <label style={labelStyle}>Password</label>
        <input name="password" type="password" required style={inputStyle} />

        <label style={labelStyle}>Role</label>
        <select name="role" required style={inputStyle}>
          <option value="">-- Select Role --</option>
          <option value="manager">Manager 🧑‍💼</option>
          <option value="employee">Employee 👩‍💻</option>
        </select>

        <button type="submit" style={btnStyle}>Create Account</button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1.25rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem"
};

const labelStyle = {
  fontWeight: "bold",
  fontSize: "1rem",
  marginBottom: "0.3rem",
  display: "block",
  color: "#1E3A8A"
};

const btnStyle = {
  width: "100%",
  padding: "0.8rem",
  backgroundColor: "#1E3A8A",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "1.1rem",
  cursor: "pointer"
};

export default Signup;

