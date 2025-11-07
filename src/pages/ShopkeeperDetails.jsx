import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useLocation, useNavigate } from "react-router-dom";
import "./ShopkeeperDetails.css";
import axios from "axios";

const ShopkeeperDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [shopkeeper, setShopkeeper] = useState(null);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState(30);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    if (!auth) {
      navigate("/");
    }
  }, [navigate]);

  // Get userId from query param
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  useEffect(() => {
    // ye function tab chalega jab page (component) load hoga
    const fetchUsers = async () => {
      try {
        const res = await axios.post(
          "http://localhost:7000/api/v1/admin/get-data-selected-user",
          { userId, filter }
          // {
          //   withCredentials: true,
          // }
        );
        console.log("res", res);
        setUser(res.data.data);
        setMessage(res.data.message);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchUsers();
  }, [filter]);

  useEffect(() => {
    if (message) {
      console.log("mess", message);
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    console.log("mess", message);
  }, [message]);

  // Dummy API call simulation
  useEffect(() => {
    if (userId) {
      // Simulate fetch
      setTimeout(() => {
        setShopkeeper({
          name: "Alice Johnson",
          email: "alice.johnson@greenthumbs.com",
          shopName: "Green Thumbs Nursery",
          userId: "SKP_00123",
          totalTransactions: 1540,
          totalPaidByUser: "₹ 24,500",
          totalPaidByByoSync: "₹ 12,300",
          performance: { success: 90, error: 5, api: 5 },
          logs: [
            {
              time: "2023-10-26 10:00:00",
              type: "GET",
              message: "Product list fetched",
              timeTaken: "50ms",
            },
            {
              time: "2023-10-26 10:01:15",
              type: "POST",
              message: "Order submitted",
              timeTaken: "120ms",
            },
            {
              time: "2023-10-26 10:02:30",
              type: "PUT",
              message: "Shop details updated",
              timeTaken: "80ms",
            },
            {
              time: "2023-10-26 10:03:45",
              type: "DELETE",
              message: "Item removed from cart",
              timeTaken: "65ms",
            },
            {
              time: "2023-10-26 10:05:00",
              type: "GET",
              message: "User profile accessed",
              timeTaken: "40ms",
            },
            {
              time: "2023-10-26 10:00:00",
              type: "GET",
              message: "Product list fetched",
              timeTaken: "50ms",
            },
            {
              time: "2023-10-26 10:01:15",
              type: "POST",
              message: "Order submitted",
              timeTaken: "120ms",
            },
            {
              time: "2023-10-26 10:02:30",
              type: "PUT",
              message: "Shop details updated",
              timeTaken: "80ms",
            },
            {
              time: "2023-10-26 10:03:45",
              type: "DELETE",
              message: "Item removed from cart",
              timeTaken: "65ms",
            },
            {
              time: "2023-10-26 10:05:00",
              type: "GET",
              message: "User profile accessed",
              timeTaken: "40ms",
            },
          ],
        });
      }, 1000);
    }
  }, [userId]);

  const handleBack = () => {
    navigate(-1);
  };

  const COLORS = ["#ef4444", "#22c55e", "#ff00c3ff"];

  const getPieData = (stats) => [
    // { name: "API Calls", value: stats.api },
    { name: "Error", value: stats.server_error },
    { name: "Success", value: stats.success },
    { name: "Bad Request", value: stats.bad_request },
  ];

  if (!shopkeeper) {
    return (
      <>
        <Header />
        <div className="shopkeeper-container">
          <div className="loading">
            <p>Loading shopkeeper details...</p>
          </div>
        </div>
      </>
    );
  }
  const total =
    user?.performance.success +
    user?.performance.server_error +
    user?.performance.bad_request;
  const successPercent = ((user?.performance.success / total) * 100).toFixed(0);
  const badPercent = ((user?.performance.bad_request / total) * 100).toFixed(0);
  const errorPercent = ((user?.performance.server_error / total) * 100).toFixed(
    0
  );

  return (
    <>
      <Header />
      <div className="shopkeeper-container">
        {message && <div className="toast">{message}</div>}

        {/* Top Bar */}
        {/* <div className="top-bar">
        <button onClick={handleBack} className="back-btn">←</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div> */}
        {/* Shopkeeper Info */}
        <div className="card">
          <h2>Information</h2>
          <p className="subtitle">Detailed profile and financial summary.</p>
          <div className="info-grid">
            <div>
              <strong>Name:</strong> {user?.name}
            </div>
            {user?.shopName ? (
              <div>
                <strong>Shop Name:</strong> {user.shopName}
              </div>
            ) : null}

            {/* <div>
              <strong>User ID:</strong> {user?.userId}
            </div> */}
            <div>
              <strong>Email:</strong> {user?.email}
            </div>
            <div>
              <strong>Total Transactions:</strong> {user?.totalTransactions}
            </div>
            <div>
              <strong>Total Amount Paid by User:</strong>{" "}
              {user?.totalPaidByUser}
            </div>
            <div>
              <strong>Paid by ByoSync:</strong> {user?.totalPaidByByoSync}
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="filter-section">
          <h3>Filter Data</h3>
          <div className="filter-sections">
            <button
              className={`filter-btn ${filter === 10 ? "active" : ""}`}
              onClick={() => setFilter(10)}
            >
              10 Days
            </button>
            <button
              className={`filter-btn ${filter === 15 ? "active" : ""}`}
              onClick={() => setFilter(15)}
            >
              15 Days
            </button>
            <button
              className={`filter-btn ${filter === 30 ? "active" : ""}`}
              onClick={() => setFilter(30)}
            >
              1 Month
            </button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="card">
          <h3>Performance Overview</h3>
          {/* <div className="chart-placeholder">
            <div className="circle-chart">
              <div className="circle-inner"></div>
            </div>
            <div className="chart-legend">
              <p>
                <span className="green-dot"></span> Success: 90%
              </p>
              <p>
                <span className="red-dot"></span> Error: 5%
              </p>
              <p>
                <span className="blue-dot"></span> API Calls: 5%
              </p>
            </div>
          </div> */}
          <div className="chart-section">
            <PieChart width={230} height={230}>
              <Pie
                data={getPieData(user.performance)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={false}
              >
                {getPieData(user.performance)
                  .filter((entry) => entry.name !== "api")
                  .map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>
              <Legend />
            </PieChart>

            <div className="chart-text">
              <p style={{ color: "#22c55e" }}>Success: {successPercent}%</p>
              <p style={{ color: "#ef4444" }}>Error: {errorPercent}%</p>
              <p style={{ color: "#ff00c3ff" }}>Bad Request: {badPercent}%</p>
              {/* <p style={{ color: "#3b82f6" }}>API Calls: {apiPercent}%</p> */}
            </div>
          </div>
        </div>

        {/* API Logs */}
        <div className="card">
          <h3>API Logs</h3>
          <p className="subtitle">Recent API call activities.</p>
          <table>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>Type</th>
                <th>Message</th>
                <th>Time Taken</th>
              </tr>
            </thead>
            <tbody>
              {user?.logs.map((log, i) => (
                <tr key={i}>
                  <td>{new Date(log.time).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${log.type}`}>
                      {log.type.replace("_", " ")}
                    </span>
                  </td>
                  <td>{log.message}</td>
                  <td>{log.timeTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {/* <footer className="footer">Made with 💜 ByoSync</footer> */}
      </div>
    </>
  );
};

export default ShopkeeperDetails;
