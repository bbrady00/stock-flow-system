import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    sku: "",
    name: "",
    category: "",
    totalStock: 0,
  });

  const fetchProducts = async () => {
    const res = await axios.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/products");
        console.log(res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/products", form);
    setForm({ sku: "", name: "", category: "", totalStock: 0 });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h1>Products</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
        />

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          type="number"
          placeholder="Stock"
          value={form.totalStock}
          onChange={(e) => setForm({ ...form, totalStock: e.target.value })}
        />

        <button type="submit">Add Product</button>
      </form>

      <hr />

      {products.map((p) => (
        <div key={p._id}>
          <p>
            {p.name} ({p.sku})
          </p>
          <button onClick={() => handleDelete(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
