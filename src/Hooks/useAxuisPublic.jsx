import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://meganews-server.vercel.app",
});
const useAxuisPublic = () => {
  return axiosPublic;
};

export default useAxuisPublic;
