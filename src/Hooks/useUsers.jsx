import { useQuery } from "@tanstack/react-query";
import useAxiosPrivet from "./useAxiosPrivet";

const useUsers = () => {
  const axiosSecure = useAxiosPrivet();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  return [users, refetch];
};

export default useUsers;
