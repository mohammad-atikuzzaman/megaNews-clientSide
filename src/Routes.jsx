import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/register",
        element: <Register></Register>
      }
    ]
  },
]);


export default router;
