import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Dashboard</h1>} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}

export default App;
