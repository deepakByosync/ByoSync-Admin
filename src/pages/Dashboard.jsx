import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    if (!auth) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    // ye function tab chalega jab page (component) load hoga
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:7000/api/v1/admin/admin-stats",
          {
            withCredentials: true,
          }
        );
        console.log("res", res);
        setStats(res.data.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <main className="dashboard-content">
        <h1 className="dashboard-title">Dashboard Overview</h1>

        <div className="panel-container">
          {/* Shopkeeper Panel */}
          <div className="panel-card">
            <h2>Shopkeeper Panel</h2>
            <div className="panel-row">
              <span>Total Shopkeepers</span>
              <strong>{stats?.totalMerchants}</strong>
            </div>
            <div className="panel-row">
              <span>Total Transactions</span>
              <strong>{stats?.totalOrders}</strong>
            </div>
            <div className="panel-row">
              <span>Total Amount Received</span>
              <strong>₹ {stats?.totalAmount}</strong>
            </div>
            <div className="panel-row">
              <span>Paid by ByoSync</span>
              <strong>₹ {stats?.totalDiscount}</strong>
            </div>
            <button
              className="view-btn"
              onClick={() => navigate("/top-users?userType=merchant")}
            >
              View More
            </button>
          </div>

          {/* Customer Panel */}
          <div className="panel-card">
            <h2>Customer Panel</h2>
            <div className="panel-row">
              <span>Total Customers</span>
              <strong>{stats?.totalUsers}</strong>
            </div>
            <div className="panel-row">
              <span>Total Transactions</span>
              <strong>{stats?.totalOrders}</strong>
            </div>
            <div className="panel-row">
              <span>Paid by Users</span>
              <strong>₹ {stats?.totalAmount}</strong>
            </div>
            <div className="panel-row">
              <span>Discount by ByoSync</span>
              <strong>₹ {stats?.totalDiscount}</strong>
            </div>
            <button
              className="view-btn"
              onClick={() => navigate("/top-users?userType=user")}
            >
              View More
            </button>
          </div>

          {/* logs Panel */}
          <div className="panel-card">
            <h2>Logs Panel</h2>
            <div className="panel-row">
              <button
                className="view-btn"
                onClick={() => navigate("/logs?log=BACKEND")}
              >
                Back End
              </button>
              {/* </div>
            <div className="panel-row"> */}
              <button
                className="view-btn"
                onClick={() => navigate("/logs?log=APP")}
              >
                APP
              </button>
              {/* </div>
            <div className="panel-row"> */}
              <button
                className="view-btn"
                onClick={() => navigate("/logs?log=ML")}
              >
                ML
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="footer">
        <p>
          Made with 💜 <a href="#">ByoSync</a>
        </p>
      </footer> */}
    </div>
  );
};

export default Dashboard;
