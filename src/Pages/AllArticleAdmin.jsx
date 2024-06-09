import axios from "axios";
import useAllArticles from "../Hooks/useAllArticles";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import Swal from "sweetalert2";
import { FaDotCircle } from "react-icons/fa";

const AllArticleAdmin = () => {
  const axiosSecure = useAxiosPrivet();
  const [allArticle, refetch] = useAllArticles();

  const handleApprove = (id) => {
    console.log("approve", id);
    axiosSecure
      .patch(`/my-article/${id}`, { status: "approved" })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Status changed to Approved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        refetch();
      });
  };
  const handleDecline = (id) => {
    console.log("decline", id);
    axiosSecure
      .patch(`/my-article/${id}`, { status: "declined" })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Status changed to decline",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        refetch();
      });
  };
  return (
    <div>
      <h2 className="font-bold text-3xl p-6 bg-gray-500 ml-1">All Articles</h2>
      <div className="mt-4">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Profile</th>
              <th>Photo</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th colSpan={3}>-------Action-------</th>
            </tr>
          </thead>
          <tbody className="border border-t-gray-800">
            {allArticle.map((article, index) => (
              <tr
                key={article._id}
                className={index % 2 === 1 ? "bg-gray-300" : "bg-gray-400"}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.authorName}</td>
                <td>{article.authorEmail}</td>
                <td>
                  <img
                    src={article.authorPhoto}
                    alt=""
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td>{article.postedDate}</td>
                <td>
                  {article.status === "approved" && (
                    <div className="text-green-700 flex items-center gap-2">
                      <FaDotCircle></FaDotCircle>
                      {article.status}
                    </div>
                  )}
                  {article.status === "declined" && (
                    <div className="text-orange-700 flex items-center gap-2">
                      <FaDotCircle></FaDotCircle>
                      {article.status}
                    </div>
                  )}
                  {article.status === "pending" && (
                    <div className="text-yellow-400 flex items-center gap-2">
                      <FaDotCircle></FaDotCircle>
                      {article.status}
                    </div>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleApprove(article._id)}
                    disabled={article.status === "approved" ? true : false}
                    className={
                      article.status === "approved"
                        ? "p-2 bg-gray-500  text-white rounded-md"
                        : "p-2 bg-green-700  text-white rounded-md"
                    }>
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDecline(article._id)}
                    disabled={article.status === "declined"}
                    className={
                      article.status === "declined"
                        ? "p-2 bg-gray-500  text-white rounded-md"
                        : "p-2 bg-orange-700  text-white rounded-md"
                    }>
                    Decline
                  </button>
                </td>
                <td>
                  <button className="p-2 bg-red-700 text-white rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllArticleAdmin;
