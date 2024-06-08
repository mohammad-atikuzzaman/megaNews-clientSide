import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./Routes.jsx";
import AuthContextComponent from "./Contexts/AuthContextComponent.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextComponent>
      <RouterProvider router={router} />
    </AuthContextComponent>
  </React.StrictMode>
);
