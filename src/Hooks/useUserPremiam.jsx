import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivet from "./useAxiosPrivet";

const useUserPremiam = () => {
  const axiosSecure = useAxiosPrivet();
  const { user } = useAuth();
  const { data: isPremium, isPending: isPremiumLoading, refetch: isPremiumRefetch } = useQuery({
    queryKey: [user?.email, "isPremium"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/premium/${user.email}`);
      return res.data?.premium;
    },
  });
  return [isPremium, isPremiumLoading, isPremiumRefetch];
};

export default useUserPremiam;
