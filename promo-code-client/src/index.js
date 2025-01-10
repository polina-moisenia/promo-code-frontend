import React from "react";
import ReactDOM from "react-dom/client"; // Импорт корректного метода для React 18+
import App from "./App";
import "./styles/components.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
