import useAuth from './useAuth';
import useAxuisPublic from './useAxuisPublic';
import { useQuery } from '@tanstack/react-query';

const usePrice = () => {
  const {user} = useAuth()
  const axiosPublic = useAxuisPublic();
  const { data: priceData = {}, isLoading} = useQuery ({
    queryKey: ["priceData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/price/${user?.email}`);
      return res.data;
    },
  });

  return [priceData, isLoading];
};

export default usePrice;