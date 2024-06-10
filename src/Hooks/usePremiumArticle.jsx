import useAxiosPrivet from "./useAxiosPrivet";
import { useQuery } from "@tanstack/react-query";

const usePremiumArticle = () => {
  const axiosSecure = useAxiosPrivet();
  const { data: premiumArticles = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/premium-articles");
      return res.data;
    },
  });

  return [premiumArticles, refetch];
};

export default usePremiumArticle;
