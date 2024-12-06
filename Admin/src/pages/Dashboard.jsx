import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    /*totalOrders: 0,
    recentProducts: [],*/
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/stats')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setStats(data))
      .catch(error => {
        console.error('Error fetching stats:', error);
        // Update state to show an error message to users
        setStats({
          totalProducts: 0
          /*totalOrders: 0,
          recentProducts: []*/
        });
      });
  }, []);

  return (
    <div>
      <h1>Dashboard  joon </h1>
      <div>
        <h2>Total Products: {stats.totalProducts}</h2>
      </div>
      <div>
        <h2>Recent Products</h2>
    
      </div>
    </div>
  );
};

export default Dashboard;
