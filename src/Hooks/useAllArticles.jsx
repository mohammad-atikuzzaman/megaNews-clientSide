import { useQuery } from "@tanstack/react-query";
import useAxiosPrivet from "./useAxiosPrivet";

const useAllArticles = () => {
  const axiosSecure = useAxiosPrivet();
  const { data: allArticle = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-article");
      return res.data;
    },
  });

  return [allArticle, refetch];
};

export default useAllArticles;
