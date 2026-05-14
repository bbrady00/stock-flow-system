import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "STORE",
  });

  const fetchLocations = async () => {
    const res = await axios.get("/locations");
    setLocations(res.data);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchLocations();
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/locations", form);

    setForm({
      name: "",
      type: "STORE",
    });

    fetchLocations();
  };

  return (
    <div>
      <h1>Locations</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Location Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="STORE">STORE</option>
          <option value="WAREHOUSE">WAREHOUSE</option>
          <option value="OFFSITE">OFFSITE</option>
        </select>

        <button type="submit">Add Location</button>
      </form>

      <hr />

      {locations.map((l) => (
        <div key={l._id}>
          <p>
            {l.name} — {l.type}
          </p>
        </div>
      ))}
    </div>
  );
}
