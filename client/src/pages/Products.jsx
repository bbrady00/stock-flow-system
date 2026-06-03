import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    sku: "",
    name: "",
    category: "",
    totalStock: "",
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

    if (!form.sku.trim()) return;
    if (!form.name.trim()) return;
    if (!form.category.trim()) return;
    if (Number(form.totalStock) < 0) return;

    await axios.post(
      "/products",
      {
        ...form,
        totalStock: Number(form.totalStock),
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );

    setForm({
      sku: "",
      name: "",
      category: "",
      totalStock: "",
    });

    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/products/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    fetchProducts();
  };

  return (
    <div className="page-container">
      <h1>Products</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="form-input"
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="form-input"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          className="form-input"
          type="number"
          placeholder="Stock"
          value={form.totalStock}
          onChange={(e) => setForm({ ...form, totalStock: e.target.value })}
        />

        <button className="primary-btn" type="submit">
          Add Product
        </button>
      </form>

      <div className="product-list">
        {products.length === 0 ? (
          <p className="empty-state">No products found</p>
        ) : (
          products.map((p) => (
            <div className="card-item" key={p._id}>
              <h3>{p.name}</h3>
              
              <p>SKU: {p.sku}</p>
              <p>Category: {p.category}</p>
              <p>Stock: {p.totalStock}</p>

              <button
                className="danger-btn"
                onClick={() => handleDelete(p._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
