import { useEffect, useState } from "react";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import ArticleCard from "../SharedComponents/ArticleCard";
import usePublisher from "../Hooks/usePublisher";
import { useQuery } from "@tanstack/react-query";

const AllArticle = () => {
  const axiosSecure = useAxiosPrivet();
  const [articles, setArticles] = useState([]);
  const [display, setDisplay] = useState(false);
  const [publishers] = usePublisher();
  const {data} = useQuery({
    queryKey: ["alldata"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-articles");
      setArticles(res.data)
      return res.data;
    },
  });

  const handleFilterByPublisher = (publisher) => {
    // console.log(publisher);
    axiosSecure.get(`all-filtered-articles/${publisher}`).then((res) => {
      setArticles(res.data);
    });
  };

  const handlSearch = (e) => {
    e.preventDefault();
    const search = e.target.title.value;
    axiosSecure.get(`/all-searched-articles/${search}`).then((res) => {
      setArticles(res.data);
    });
  };

  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-3xl text-center my-6">All article</h2>
      <div className="flex justify-between">
        <div>
          <form
            onSubmit={handlSearch}
            className="border border-gray-600 mb-3 rounded-md">
            <input
              type="text"
              name="title"
              placeholder="Post title"
              className="bg-gray-200 p-2 outline-none "
            />
            <input
              type="submit"
              value="Search"
              className="bg-violet-500 p-2 text-gray-100 font-semibold"
            />
          </form>
        </div>

        <div className=" relative">
          <button
            onClick={() => setDisplay(!display)}
            className="bg-violet-400 font-semibold p-1 rounded-md text-white mb-2">
            Filter By
          </button>
          <div
            className={
              display
                ? "absolute bg-gray-800 p-3 font-semibold text-gray-100 rounded-md top-8 right-0"
                : "hidden"
            }>
            <ul>
              {publishers.map((publisher) => (
                <li
                  key={publisher._id}
                  className="bg-violet-500 my-1 px-1 rounded-md">
                  <button
                    onClick={() =>
                      handleFilterByPublisher(publisher?.publisherName)
                    }>
                    {publisher?.publisherName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <hr className="mb-6" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article}></ArticleCard>
        ))}
      </div>
    </div>
  );
};

export default AllArticle;
