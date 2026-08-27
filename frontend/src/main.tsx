import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./styles/style.css";
import { router } from "./router";

const container = document.getElementById("root");
if (!container) {
  throw new Error("No se encontró el elemento #root en index.html");
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);