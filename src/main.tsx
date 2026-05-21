import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          color: "#fff",
          fontSize: "14px",
          padding: "12px 20px",
        },
        success: {
          style: {
            background: "#096d2e", // green
          },
        },
        error: {
          style: {
            background: "#ef4444", // red
          },
        },
      }}
    />
  </React.StrictMode>,
);
