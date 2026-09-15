import { useEffect, useState } from "react";
import axios from "../api/axios.js";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("/inventory");
      setInventory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loaddata = async () => {
      fetchInventory();
    };

    loaddata();
  }, []);

  return (
    <div className="page-container">
      <h1>Inventory</h1>
      <div className="section-container">
        <div className="stock-list">
          {inventory.length === 0 ? (
            <p className="empty-state">No inventory records found</p>
          ) : (
            inventory.map((item) => (
              <div className="card-item" key={item._id}>
                <h3>{item.productId?.name}</h3>
                <p>SKU: {item.productId?.sku}</p>
                <p>Location: {item.locationId?.name}</p>
                <p>Type: {item.locationId?.type}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
