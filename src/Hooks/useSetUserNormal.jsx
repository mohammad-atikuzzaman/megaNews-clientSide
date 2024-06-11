import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxuisPublic from "./useAxuisPublic";


const useSetUserNormal = () => {
   const { user } = useAuth();
   const axiosPublic = useAxuisPublic();
   const {
     data: priceData = {},
     isLoading,
     refetch,
   } = useQuery({
     queryKey: ["priceData"],
     queryFn: async () => {
       const res = await axiosPublic.get(`/price/${user?.email}`);
       return res.data;
     },
   });

   return [priceData, isLoading, refetch];
};

export default useSetUserNormal;