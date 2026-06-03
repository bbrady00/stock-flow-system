import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "STORE",
  });

  const fetchLocations = async () => {
    try {
      const res = await axios.get("/locations");
      setLocations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchLocations();
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    await axios.post("/locations", form, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setForm({
      name: "",
      type: "STORE",
    });

    fetchLocations();
  };

  return (
    <div className="page-container">
      <h1>Locations</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="form-input"
          placeholder="Location Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="form-input"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="STORE">STORE</option>
          <option value="WAREHOUSE">WAREHOUSE</option>
          <option value="OFFSITE">OFFSITE</option>
        </select>

        <button className="primary-btn" type="submit">
          Add Location
        </button>
      </form>

      <div className="section-container">
        <h2>Locations</h2>
        <div className="location-list">
          {locations.length === 0 ? (
            <p className="empty-state">No locations created yet</p>
          ) : (
            locations.map((l) => (
              <div className="card-item" key={l._id}>
                <h3>{l.name}</h3>
                <p>Type: {l.type}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
