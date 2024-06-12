import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const usePublisher = () => {
  const { data: publishers = [], refetch } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axios.get(
        "https://meganews-server.vercel.app/publisher"
      );
      return res.data;
    },
  });

  return [publishers, refetch];
};

export default usePublisher;
