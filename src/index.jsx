import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Scroll suave global
const style = document.createElement('style');
style.innerHTML = `html { scroll-behavior: smooth; }`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 