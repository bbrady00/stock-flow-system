import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [movements, setMovements] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    type: "IN",
    quantity: "",
    fromLocation: "",
    toLocation: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get("/locations");
      setLocations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMovements = async () => {
    try {
      const res = await axios.get("/stock");
      setMovements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchProducts();
      await fetchLocations();
      await fetchMovements();
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productId) return;
    if (Number(form.quantity) <= 0) return;

    if (form.type === "IN" && !form.toLocation) return;
    if (form.type === "OUT" && !form.fromLocation) return;

    await axios.post("/stock", {
      ...form,
      quantity: Number(form.quantity),
    });

    await fetchMovements();
    await fetchProducts();

    setForm({
      productId: "",
      type: "IN",
      quantity: "",
      fromLocation: "",
      toLocation: "",
    });
  };

  const handleTypeChange = (e) => {
    setForm({
      ...form,
      type: e.target.value,
      fromLocation: "",
      toLocation: "",
    });
  };

  return (
    <div className="page-container">
      <h1>Stock Movement</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <select
          className="form-input"
          value={form.productId}
          onChange={(e) =>
            setForm({
              ...form,
              productId: e.target.value,
            })
          }
        >
          <option value="" disabled>
            Select Product
          </option>

          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          className="form-input"
          value={form.type}
          onChange={handleTypeChange}
        >
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>

        <select
          className="form-input"
          value={form.type === "IN" ? form.toLocation : form.fromLocation}
          onChange={(e) => {
            if (form.type === "IN") {
              setForm({
                ...form,
                toLocation: e.target.value,
              });
            } else {
              setForm({
                ...form,
                fromLocation: e.target.value,
              });
            }
          }}
        >
          <option value="" disabled>
            {form.type === "IN" ? "Select Destination" : "Select Source"}
          </option>

          {locations.map((location) => (
            <option key={location._id} value={location._id}>
              {location.name}
            </option>
          ))}
        </select>

        <input
          className="form-input"
          type="number"
          min="1"
          value={form.quantity}
          placeholder="Quantity"
          onChange={(e) =>
            setForm({
              ...form,
              quantity: e.target.value,
            })
          }
        />

        <button className="primary-btn" type="submit">
          Add Movement
        </button>
      </form>

      <div className="section-container">
        <h2>Movement History</h2>

        <div className="stock-list">
          {movements.length === 0 ? (
            <p className="empty-state">No stock movements recorded yet</p>
          ) : (
            movements.map((m) => (
              <div className="card-item" key={m._id}>
                <p>
                  {m.productId?.name} —{" "}
                  <span className={m.type === "IN" ? "stock-in" : "stock-out"}>
                    {m.type}
                  </span>{" "}
                  — {m.quantity}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
