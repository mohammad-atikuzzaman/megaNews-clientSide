import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingScreen from "../SharedComponents/LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
   const location = useLocation();
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingScreen></LoadingScreen>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default ProtectedRoute;