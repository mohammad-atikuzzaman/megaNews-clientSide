import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosPrivet = axios.create({
  baseURL: "https://meganews-server.vercel.app",
});

const useAxiosPrivet = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  axiosPrivet.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("userToken");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosPrivet.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response.status;

      // console.log("statas error in interseptor", status);

      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosPrivet;
};

export default useAxiosPrivet;
