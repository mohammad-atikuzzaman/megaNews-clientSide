import { FaNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUserPremiam from "../Hooks/useUserPremiam";

const ArticleCard = ({ article }) => {
  const [isPremium] = useUserPremiam();
  const { _id, authorName, authorPhoto, title, detail, image, publisher } =
    article;
  return (
    <div
      className={
        article?.type === "premium"
          ? "rounded-md shadow-md bg-gray-900 text-yellow-600 border-4 border-yellow-600"
          : "rounded-md shadow-md bg-gray-900 text-gray-100"
      }>
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <img
            src={authorPhoto}
            alt=""
            className="object-cover object-center w-8 h-8 rounded-full shadow-sm bg-gray-500 border-gray-700"
          />
          <div className="-space-y-1">
            <h2 className="text-sm font-semibold leading-none">{authorName}</h2>
          </div>
        </div>
      </div>
      <img
        src={image}
        alt=""
        className="object-cover object-center w-full h-72 bg-gray-500"
      />
      <div className="p-3">
        <div>
          <div className="flex items-center gap-2">
            <FaNewspaper className="text-lg"></FaNewspaper>
            <span className="font-semibold">Publisher : </span>
            <p>{publisher}</p>
          </div>
          <h2 className="font-semibold text-xl">{title}</h2>
          <p>{detail.slice(0, 80)}</p>
        </div>
        <Link to={`/article-details/${_id}`}>
          <button
            disabled={article?.type ==="premium" ? isPremium? false : true :false}
            className={
              article?.type === "premium"
                ? "w-full bg-yellow-700 text-white p-2 rounded-md mt-3"
                : "w-full bg-violet-400 p-2 rounded-md mt-3"
            }>
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
