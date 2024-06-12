import { useEffect, useState } from "react";
import useAxuisPublic from "../Hooks/useAxuisPublic";
import { useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingScreen from "../SharedComponents/LoadingScreen";

const DetailsArticle = () => {
  const {user, setLoading, loading}= useAuth()
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [tags, setTags] = useState([]);
  const axiosPublic = useAxuisPublic();

  // console.log(user?.email)

  useEffect(() => {
     setLoading(true)
    setTimeout(() => {
          axiosPublic.get(`/article/${id}?email=${user?.email}`).then((res) => {
            setArticle(res.data);
            const tags = res.data.tags;
            setTags(tags);
            // console.log(res.data.views + 1);
            axiosPublic
              .patch(`/article/${id}`, { views: res.data.views + 1 })
              .then((res) => {
                // console.log(res.data);
                setLoading(false)
              });
          });
    }, 1000);

  }, [axiosPublic, id, setLoading, user?.email]);

  if(loading){
    return <div className="w-full h-screen flex justify-center items-center"> <LoadingScreen></LoadingScreen></div>
  }

  return (
    <div className="p-5 container mx-auto sm:p-10 md:p-16 bg-gray-800 text-gray-100 my-6">
      <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
        <img
          src={article.image}
          alt=""
          className="w-full h-60 sm:h-96 bg-gray-500"
        />
        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-900">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="inline-block text-2xl font-semibold sm:text-3xl">
                {article.title}
              </p>
              <p><span className="font-semibold">Views : </span> {article?.views}</p>
            </div>
            <div className="text-xs text-gray-400">
              By
              <p className="text-xs hover:underline">{article.authorName}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>
                <span className="font-semibold">Publisher :</span>{" "}
                <span className="border px-1 rounded">{article.publisher}</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Tags :</span>
                <div>
                  {tags?.map((tag, i) => (
                    <p key={i} className="bg-gray-400 px-1 rounded-md">
                      {tag.value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-gray-100">
            <p>{article.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsArticle;
