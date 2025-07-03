import React, { useEffect, useState } from "react";
import axios from "axios";

function FeedbackTimeline({ employeeId = 2 }) {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/employee/${employeeId}/feedbacks`)
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, [employeeId]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>📋 Feedback Timeline</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        <ul>
          {feedbacks.map((fb) => (
            <li key={fb.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              <p><strong>🟢 Strengths:</strong> {fb.strengths}</p>
              <p><strong>🔴 Areas to Improve:</strong> {fb.areas_to_improve}</p>
              <p><strong>📊 Sentiment:</strong> {fb.sentiment}</p>
              <p><strong>📅 Created:</strong> {new Date(fb.created_at).toLocaleString()}</p>
              <p><strong>✅ Acknowledged:</strong> {fb.acknowledged ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedbackTimeline;
