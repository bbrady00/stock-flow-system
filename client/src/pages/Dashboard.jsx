import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  const fetchDashboard = async () => {
    const res = await axios.get("/dashboard", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setStats(res.data);
  };

  useEffect(() => {
    const loaddata = async () => {
      fetchDashboard();
    };

    loaddata();
  }, []);

  if (!stats) return <p>Loading...</p>;

  const {
    totalProducts = 0,
    totalLocations = 0,
    totalMovements = 0,
    incomingProducts = [],
    reservedProducts = [],
    lowStockProducts = [],
  } = stats;

  return (
    <div className="page-container">
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Total Products</h2>
          <p>{totalProducts}</p>
        </div>

        <div className="dashboard-card">
          <h2>Total Locations</h2>
          <p>{totalLocations}</p>
        </div>

        <div className="dashboard-card">
          <h2>Total Movements</h2>
          <p>{totalMovements}</p>
        </div>
      </div>

      <div className="section-container">
        <h2>Incoming Stock</h2>

        <div className="stock-list">
          {incomingProducts.length === 0 ? (
            <p>No incoming stock</p>
          ) : (
            incomingProducts.map((i) => (
              <div className="card-item" key={i._id}>
                <p>Incoming: {i.incomingStock}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="section-container">
        <h2>Reserved Stock</h2>

        <div className="stock-list">
          {reservedProducts.length === 0 ? (
            <p>No reserved stock</p>
          ) : (
            reservedProducts.map((i) => (
              <div className="card-item" key={i._id}>
                <p>Reserved: {i.offsiteReserved}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="section-container">
        <h2>Low Stock Alerts</h2>

        <div className="stock-list">
          {lowStockProducts.length === 0 ? (
            <p>No low stock items</p>
          ) : (
            lowStockProducts.map((p) => (
              <div className="card-item" key={p._id}>
                <p>
                  {p.name} — {p.totalStock} remaining
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
