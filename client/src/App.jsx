import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import Stock from "./pages/Stock.jsx";
import Locations from "./pages/Locations.jsx";
import Inventory from "./pages/Inventory.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/inventory" element={<Inventory />} />
      </Route>
    </Routes>
  );
}
