import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextComponent";


const useAuth = () => {
  const authCo= useContext(AuthContext)
  return (
    authCo
  );
};

export default useAuth;