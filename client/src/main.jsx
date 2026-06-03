// import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/base.css";
import "./assets/styles/layout.css";
import "./assets/styles/buttons.css";
import "./assets/styles/forms.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
