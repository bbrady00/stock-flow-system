import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Stock from "./pages/Stock";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Dashboard</h1>} />
      <Route path="/products" element={<Products />} />
      <Route path="/stock" element={<Stock />} />
    </Routes>
  );
}

export default App;
