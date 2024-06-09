import axios from "axios";

const axiosPrivet = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosPrivet = () => {
 return axiosPrivet
};

export default useAxiosPrivet;
