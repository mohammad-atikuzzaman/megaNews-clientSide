import { toast } from "react-toastify";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import LoadingScreen from "../SharedComponents/LoadingScreen";
import { Navigate, useLocation } from "react-router-dom";

const AdminProtect = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading, logOut } = useAuth();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingScreen></LoadingScreen>
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  logOut().then(() => {
    toast.error("User Logged Out");
  });
  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default AdminProtect;
