import { FaNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  // console.log(article);
  const {_id, authorName, authorPhoto, title, details, image, publisher}= article;
  return (
    <div className="rounded-md shadow-md sm:w-96 bg-gray-900 text-gray-100">
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
          <p>{title}</p>
        </div>
        <Link to={`/article-details/${_id}`}>
          <button className="w-full bg-violet-400 p-2 rounded-md">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;