import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Legend } from "recharts";
import axios from "axios";
import "./ShopkeeperPage.css"; // styling separate rakhi hai

const TopUsersPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    if (!auth) {
      navigate("/");
    }
  }, [navigate]);

  // Sample shopkeeper data
  const shopkeepers = [
    {
      id: 1,
      name: "John's Electronics",
      stats: {
        success: 145,
        error: 12,
        apiCalls: 87,
      },
      recentActivity: [
        {
          startTime: "12:30 PM",
          type: "success",
          message: "Order processed",
          timeTaken: "2.1s",
        },
        {
          startTime: "12:28 PM",
          type: "error",
          message: "Payment failed",
          timeTaken: "1.5s",
        },
        {
          startTime: "12:25 PM",
          type: "success",
          message: "Inventory updated",
          timeTaken: "0.8s",
        },
        {
          startTime: "12:20 PM",
          type: "api_call",
          message: "Product sync",
          timeTaken: "3.2s",
        },
      ],
    },
    {
      id: 2,
      name: "Sarah's Fashion Store",
      stats: {
        success: 203,
        error: 8,
        apiCalls: 124,
      },
      recentActivity: [
        {
          startTime: "11:45 AM",
          type: "success",
          message: "Sale completed",
          timeTaken: "1.9s",
        },
        {
          startTime: "11:42 AM",
          type: "success",
          message: "Customer registered",
          timeTaken: "1.2s",
        },
        {
          startTime: "11:40 AM",
          type: "error",
          message: "Stock unavailable",
          timeTaken: "0.6s",
        },
        {
          startTime: "11:35 AM",
          type: "api_call",
          message: "Price update",
          timeTaken: "2.4s",
        },
      ],
    },
    {
      id: 3,
      name: "Mike's Hardware",
      stats: {
        success: 98,
        error: 15,
        apiCalls: 56,
      },
      recentActivity: [
        {
          startTime: "10:15 AM",
          type: "success",
          message: "Delivery scheduled",
          timeTaken: "2.8s",
        },
        {
          startTime: "10:12 AM",
          type: "api_call",
          message: "Shipping sync",
          timeTaken: "4.1s",
        },
        {
          startTime: "10:08 AM",
          type: "error",
          message: "API timeout",
          timeTaken: "5.0s",
        },
        {
          startTime: "10:05 AM",
          type: "success",
          message: "Order confirmed",
          timeTaken: "1.7s",
        },
      ],
    },
    {
      id: 4,
      name: "Emma's Bookshop",
      stats: {
        success: 167,
        error: 5,
        apiCalls: 93,
      },
      recentActivity: [
        {
          startTime: "09:50 AM",
          type: "success",
          message: "Book reserved",
          timeTaken: "1.3s",
        },
        {
          startTime: "09:48 AM",
          type: "success",
          message: "Payment received",
          timeTaken: "2.0s",
        },
        {
          startTime: "09:45 AM",
          type: "api_call",
          message: "Catalog sync",
          timeTaken: "3.5s",
        },
        {
          startTime: "09:40 AM",
          type: "error",
          message: "Connection lost",
          timeTaken: "2.2s",
        },
      ],
    },
    {
      id: 5,
      name: "David's Grocery",
      stats: {
        success: 289,
        error: 22,
        apiCalls: 156,
      },
      recentActivity: [
        {
          startTime: "09:30 AM",
          type: "success",
          message: "Checkout completed",
          timeTaken: "1.5s",
        },
        {
          startTime: "09:28 AM",
          type: "error",
          message: "Barcode scan failed",
          timeTaken: "0.9s",
        },
        {
          startTime: "09:25 AM",
          type: "success",
          message: "Loyalty points added",
          timeTaken: "1.1s",
        },
        {
          startTime: "09:20 AM",
          type: "api_call",
          message: "Stock level check",
          timeTaken: "2.7s",
        },
      ],
    },
    {
      id: 6,
      name: "Lisa's Pet Shop",
      stats: {
        success: 134,
        error: 9,
        apiCalls: 78,
      },
      recentActivity: [
        {
          startTime: "08:55 AM",
          type: "success",
          message: "Appointment booked",
          timeTaken: "1.8s",
        },
        {
          startTime: "08:52 AM",
          type: "api_call",
          message: "Supplier update",
          timeTaken: "3.9s",
        },
        {
          startTime: "08:50 AM",
          type: "success",
          message: "Product sold",
          timeTaken: "1.4s",
        },
        {
          startTime: "08:45 AM",
          type: "error",
          message: "Invalid coupon",
          timeTaken: "0.7s",
        },
      ],
    },
    {
      id: 7,
      name: "Tom's Coffee Shop",
      stats: {
        success: 312,
        error: 18,
        apiCalls: 189,
      },
      recentActivity: [
        {
          startTime: "08:30 AM",
          type: "success",
          message: "Mobile order ready",
          timeTaken: "2.3s",
        },
        {
          startTime: "08:28 AM",
          type: "success",
          message: "Rewards redeemed",
          timeTaken: "1.6s",
        },
        {
          startTime: "08:25 AM",
          type: "error",
          message: "Printer offline",
          timeTaken: "1.2s",
        },
        {
          startTime: "08:20 AM",
          type: "api_call",
          message: "Menu sync",
          timeTaken: "2.9s",
        },
      ],
    },
    {
      id: 8,
      name: "Nina's Bakery",
      stats: {
        success: 221,
        error: 11,
        apiCalls: 142,
      },
      recentActivity: [
        {
          startTime: "07:45 AM",
          type: "success",
          message: "Pre-order confirmed",
          timeTaken: "1.7s",
        },
        {
          startTime: "07:42 AM",
          type: "api_call",
          message: "Ingredient tracking",
          timeTaken: "3.3s",
        },
        {
          startTime: "07:40 AM",
          type: "success",
          message: "Batch completed",
          timeTaken: "2.1s",
        },
        {
          startTime: "07:35 AM",
          type: "error",
          message: "Low stock alert",
          timeTaken: "0.5s",
        },
      ],
    },
    {
      id: 9,
      name: "Alex's Pharmacy",
      stats: {
        success: 187,
        error: 7,
        apiCalls: 104,
      },
      recentActivity: [
        {
          startTime: "07:20 AM",
          type: "success",
          message: "Prescription filled",
          timeTaken: "2.5s",
        },
        {
          startTime: "07:18 AM",
          type: "success",
          message: "Insurance verified",
          timeTaken: "3.1s",
        },
        {
          startTime: "07:15 AM",
          type: "error",
          message: "Verification failed",
          timeTaken: "1.8s",
        },
        {
          startTime: "07:10 AM",
          type: "api_call",
          message: "Health record sync",
          timeTaken: "4.2s",
        },
      ],
    },
    {
      id: 10,
      name: "Rachel's Florist",
      stats: {
        success: 156,
        error: 6,
        apiCalls: 89,
      },
      recentActivity: [
        {
          startTime: "07:00 AM",
          type: "success",
          message: "Delivery assigned",
          timeTaken: "1.9s",
        },
        {
          startTime: "06:58 AM",
          type: "api_call",
          message: "Route optimization",
          timeTaken: "3.7s",
        },
        {
          startTime: "06:55 AM",
          type: "success",
          message: "Custom order placed",
          timeTaken: "2.2s",
        },
        {
          startTime: "06:50 AM",
          type: "error",
          message: "Address invalid",
          timeTaken: "1.1s",
        },
      ],
    },
  ];
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("userType"); // e.g., "merchant"
  const COLORS = ["#ef4444", "#22c55e", "#ff00c3ff"];

  useEffect(() => {
    // ye function tab chalega jab page (component) load hoga
    const fetchTopUsers = async () => {
      try {
        const res = await axios.post(
          "http://localhost:7000/api/v1/admin/get-top-users",
          { userType }
          // {
          //   withCredentials: true,
          // }
        );
        console.log("res", res);
        setUser(res.data.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchTopUsers();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const getPieData = (stats) => [
    // { name: "API Calls", value: stats.api },
    { name: "Error", value: stats.server_error },
    { name: "Success", value: stats.success },
    { name: "Bad Request", value: stats.bad_request },
  ];

  return (
    <>
      <Header />

      <div className="shopkeeper-containers">
        {user?.topUsers.map((shop) => {
          const total =
            shop.performance.success +
            shop.performance.server_error +
            shop.performance.bad_request;
          const successPercent = (
            (shop.performance.success / total) *
            100
          ).toFixed(0);
          const errorPercent = (
            (shop.performance.server_error / total) *
            100
          ).toFixed(0);
          const badPercent = (
            (shop.performance.bad_request / total) *
            100
          ).toFixed(0);
          // const apiPercent = ((shop.performance.api / total) * 100).toFixed(0);

          return (
            <div key={shop.id} className="shop-card">
              <h3 className="shop-name">{shop.name}</h3>
              <div className="chart-section">
                <PieChart width={230} height={230}>
                  <Pie
                    data={getPieData(shop.performance)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                  >
                    {getPieData(shop.performance)
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
                  <p style={{ color: "#ff00c3ff" }}>
                    Bad Request: {badPercent}%
                  </p>
                  {/* <p style={{ color: "#3b82f6" }}>API Calls: {apiPercent}%</p> */}
                </div>
              </div>
              <table className="activity-table">
                <thead>
                  <tr>
                    <th className="time">Start Time</th>
                    <th className="type">Type</th>
                    <th>Message</th>
                    <th>Time Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {shop.logs.map((a, i) => (
                    <tr key={i}>
                      <td>{new Date(a.time).toLocaleString()}</td>
                      <td>
                        <span className={`badge ${a.type}`}>
                          {a.type.replace("_", " ")}
                        </span>
                      </td>
                      <td>{a.message}</td>
                      <td>{a.timeTaken}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="view-btn"
                onClick={() => navigate(`/user-details?userId=${shop.userId}`)}
                // onClick={() => navigate(`/shopkeepers-details?userId=${id}`)}
              >
                View More
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TopUsersPage;
