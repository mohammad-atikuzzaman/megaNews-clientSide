import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import LoadingScreen from "../SharedComponents/LoadingScreen";
import { Navigate, useLocation } from "react-router-dom";
import useUserPremiam from "../Hooks/useUserPremiam";

const PremiumProtect = ({children}) => {
   const [isPremium, isPremiumLoading] = useUserPremiam()
   const { user, loading, logOut } = useAuth();
   const location = useLocation();
   if (loading || isPremiumLoading) {
     return (
       <div className="w-full h-screen flex items-center justify-center">
         <LoadingScreen></LoadingScreen>
       </div>
     );
   }
   if (user && isPremium) {
     return children;
   }
   logOut().then(() => {
     toast.error("User Logged Out");
   });
   return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PremiumProtect;
