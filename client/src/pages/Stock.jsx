import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    type: "IN",
    quantity: 0,
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

    await axios.post("/stock", form, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    await fetchMovements();
    await fetchProducts();
  };

  return (
    <div>
      <h1>Stock Movement</h1>

      <form onSubmit={handleSubmit}>
        <select
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
        >
          <option>Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>

        <input
          type="number"
          placeholder="Quantity"
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
          }
        />

        <button type="submit">Add Movement</button>
      </form>

      <hr />

      <h2>Movement History</h2>

      {movements.map((m) => (
        <div key={m._id}>
          <p>
            {m.productId?.name} — {m.type} — {m.quantity}
          </p>
        </div>
      ))}
    </div>
  );
}
