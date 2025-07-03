import React, { useState } from "react";
import axios from "axios";

function FeedbackForm() {
  const [form, setForm] = useState({
    employee_id: 2,
    strengths: "",
    areas_to_improve: "",
    sentiment: "positive"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedback", form);
      alert("✅ Feedback submitted!");
      setForm({ ...form, strengths: "", areas_to_improve: "" });
    } catch (err) {
      alert("❌ Error submitting feedback.");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>➕ Submit Feedback</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
        <label>
          Strengths:
          <textarea name="strengths" value={form.strengths} onChange={handleChange} />
        </label>
        <label>
          Areas to Improve:
          <textarea name="areas_to_improve" value={form.areas_to_improve} onChange={handleChange} />
        </label>
        <label>
          Sentiment:
          <select name="sentiment" value={form.sentiment} onChange={handleChange}>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </label>
        <button type="submit" style={{ marginTop: "1rem" }}>Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
