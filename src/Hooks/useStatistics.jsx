import { useQuery } from "@tanstack/react-query";
import useAxuisPublic from "./useAxuisPublic";

const useStatistics = () => {
  const axiosPublic = useAxuisPublic();
  const { data: statistics = {}, refetch } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const res = await axiosPublic.get("/statistics");
      return res.data;
    },
  });

  return [statistics, refetch];
};

export default useStatistics;