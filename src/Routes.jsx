import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AddArticle from "./Pages/AddArticle";
import AllArticle from "./Pages/AllArticle";
import Subscription from "./Pages/Subscription";
import DashBoard from "./Pages/DashBoard";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./UsersProtect/ProtectedRoute";
import MyArticle from "./Pages/MyArticle";
import ErrorComponent from "./SharedComponents/ErrorComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorComponent></ErrorComponent>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/add-article",
        element: (
          <ProtectedRoute>
            <AddArticle></AddArticle>
          </ProtectedRoute>
        ),
      },
      {
        path: "/all-articles",
        element: <AllArticle></AllArticle>,
      },
      {
        path: "/subscription",
        element: (
          <ProtectedRoute>
            <Subscription></Subscription>
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: <DashBoard></DashBoard>,
      },
      {
        path: "/my-articles",
        element: (
          <ProtectedRoute>
            <MyArticle></MyArticle>
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile></Profile>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);


export default router;
