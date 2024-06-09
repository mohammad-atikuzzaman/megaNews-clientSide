import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivet from "./useAxiosPrivet";

const useUserPremiam = () => {
  const axiosSecure = useAxiosPrivet();
  const { user } = useAuth();
  const { data: isPremium, isPending: isPremiumLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data?.admin;
    },
  });
  return [isPremium, isPremiumLoading];
};

export default useUserPremiam;
