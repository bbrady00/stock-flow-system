import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    type: "IN",
    quantity: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
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
      await fetchMovements();
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productId) return;
    if (Number(form.quantity) <= 0) return;

    await axios.post(
      "/stock",
      {
        ...form,
        quantity: Number(form.quantity),
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );

    await fetchMovements();
    await fetchProducts();

    setForm({
      productId: "",
      type: "IN",
      quantity: "",
    });
  };

  return (
    <div className="page-container">
      <h1>Stock Movement</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <select
          className="form-input"
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
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
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>

        <input
          className="form-input"
          type="number"
          value={form.quantity}
          placeholder="Quantity"
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
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
