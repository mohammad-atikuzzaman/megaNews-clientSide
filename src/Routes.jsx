import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import AddArticle from "./Pages/AddArticle";
import AllArticle from "./Pages/AllArticle";
import Subscription from "./Pages/Subscription";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./UsersProtect/ProtectedRoute";
import MyArticle from "./Pages/MyArticle";
import ErrorComponent from "./SharedComponents/ErrorComponent";
import DashBoard from "./DashBoard";
import Users from "./Pages/Users";
import AdminProtect from "./UsersProtect/AdminProtect";
import AddPublisher from "./Pages/AddPublisher";
import AllArticleAdmin from "./Pages/AllArticleAdmin";
import DetailsArticle from "./Pages/DetailsArticle";

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
        path: "/article-details/:id",
        element: <DetailsArticle></DetailsArticle>,
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
  {
    path: "/dashboard",
    element: <DashBoard></DashBoard>,
    children: [
      {
        path: "users",
        element: (
          <AdminProtect>
            <Users></Users>
          </AdminProtect>
        ),
      },
      {
        path: "all-article",
        element: (
          <AdminProtect>
            <AllArticleAdmin></AllArticleAdmin>
          </AdminProtect>
        ),
      },
      {
        path: "add-publisher",
        element: (
          <AdminProtect>
            <AddPublisher></AddPublisher>
          </AdminProtect>
        ),
      },
    ],
  },
]);

export default router;
