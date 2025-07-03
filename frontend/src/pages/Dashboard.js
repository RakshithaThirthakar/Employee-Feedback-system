// src/pages/Dashboard.js

import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/feedbacks', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFeedbacks(data.feedbacks || []);
        } else {
          console.error('Failed to fetch feedbacks');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    };

    if (user.role === 'manager') {
      fetchFeedbacks();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {user.role === 'manager' ? 'Manager Dashboard' : 'Employee Dashboard'}
      </h2>

      {user.role === 'manager' ? (
        <div>
          <h3 className="text-lg font-semibold">All Feedbacks:</h3>
          <ul className="mt-2">
            {feedbacks.length === 0 ? (
              <p>No feedbacks found.</p>
            ) : (
              feedbacks.map((fb, idx) => (
                <li key={idx} className="border p-2 mb-2 rounded">
                  <strong>SSN:</strong> {fb.ssn} <br />
                  <strong>Emp ID:</strong> {fb.emp_id} <br />
                  <strong>Message:</strong> {fb.message}
                </li>
              ))
            )}
          </ul>
        </div>
      ) : (
        <p>Welcome, {user.name}! You can submit your feedback <a href="/feedback" className="text-blue-600 underline">here</a>.</p>
      )}
    </div>
  );
};

export default Dashboard;
