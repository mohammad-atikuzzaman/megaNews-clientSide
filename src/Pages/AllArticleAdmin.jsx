import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import Swal from "sweetalert2";
import { FaDotCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

const AllArticleAdmin = () => {
  const axiosSecure = useAxiosPrivet();
  const [reFetch, setRefetch] = useState(false);
  const [allArticle, setAllArticle] = useState([]);
  const [display, setDisplay] = useState(false);
  const { count } = useLoaderData();
  const itemPerPage = 5;
  const numberOfPages = Math.ceil(count / itemPerPage);
  const [selected, setSelected] = useState(0);
  const pages = [...Array(numberOfPages).keys()];
  // console.log(pages);

  useEffect(() => {
    axiosSecure
      .get(
        `/all-article?page=${selected}&size=${itemPerPage}&refetch=${reFetch}`
      )
      .then((res) => {
        setAllArticle(res.data);
      });
  }, [selected, reFetch]);

  const handleApprove = (id) => {
    // console.log("approve", id);
    axiosSecure
      .patch(`/my-article/${id}`, { status: "approved" })
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Status changed to Approved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setRefetch(!reFetch);
      });
  };

  const [decId, setDecId] = useState(null);
  const handleDecline = (id) => {
    // console.log("decline", id);
    setDecId(id);
    setDisplay(!display);
  };
  const handleDeclineSubmit = (e) => {
    e.preventDefault();
    // console.log(decId);
    const info = e.target.info.value;
    if (!info) {
      return toast.error("Please give any Feedback");
    }
    // console.log(info)
    axiosSecure
      .patch(`/my-article/${decId}`, { status: "declined", reason: info })
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Status changed to decline",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setRefetch(!reFetch)
      });
    setDisplay(!display);
  };
  const handleMakePremium = (id) => {
    // console.log("make premium", id);
    axiosSecure.patch(`/my-article/${id}`, { type: "premium" }).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Now article is premium",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setRefetch(!reFetch)
    });
  };

  const handleDelete = (id) => {
    axiosSecure.delete(`/delete-article/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Article Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
        setRefetch(!reFetch)
      }
    });
  };
  return (
    <div className="relative">
      <h2 className="font-bold text-3xl p-6 bg-gray-500 ml-1">All Articles</h2>
      <div>
        <div className="mt-4 overflow-x-scroll">
          <table className="w-full text-center ">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Name</th>
                <th>Email</th>
                <th>Photo</th>
                <th>Posted Date</th>
                <th>Status</th>
                <th colSpan={4}>-------Action-------</th>
              </tr>
            </thead>
            <tbody className="border border-t-gray-800">
              {allArticle.map((article, index) => (
                <tr
                  key={article._id}
                  className={index % 2 === 1 ? "bg-gray-300" : "bg-gray-400"}>
                  <td>{index + 1}</td>
                  <td>{article?.title}</td>
                  <td>{article?.authorName}</td>
                  <td>{article?.authorEmail}</td>
                  <td>
                    <img
                      src={article?.authorPhoto}
                      alt=""
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td>{article?.postedDate}</td>
                  <td>
                    {article?.status === "approved" && (
                      <div className="text-green-700 flex items-center gap-2">
                        <FaDotCircle></FaDotCircle>
                        {article?.status}
                      </div>
                    )}
                    {article?.status === "declined" && (
                      <div className="text-orange-700 flex items-center gap-2">
                        <FaDotCircle></FaDotCircle>
                        {article?.status}
                      </div>
                    )}
                    {article?.status === "pending" && (
                      <div className="text-yellow-400 flex items-center gap-2">
                        <FaDotCircle></FaDotCircle>
                        {article?.status}
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleApprove(article?._id)}
                      disabled={article?.status === "approved" ? true : false}
                      className={
                        article?.status === "approved"
                          ? "p-2 bg-gray-500  text-white rounded-md"
                          : "p-2 bg-green-700  text-white rounded-md"
                      }>
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDecline(article?._id)}
                      disabled={article?.status === "declined"}
                      className={
                        article?.status === "declined"
                          ? "p-2 bg-gray-500  text-white rounded-md"
                          : "p-2 bg-orange-700  text-white rounded-md"
                      }>
                      Decline
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(article?._id)}
                      className="p-2 bg-red-700 text-white rounded-md">
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMakePremium(article?._id)}
                      disabled={article?.type === "premium"}
                      className={
                        article?.type === "premium"
                          ? "p-2 bg-gray-500  text-white rounded-md"
                          : "p-2 bg-orange-700  text-white rounded-md"
                      }>
                      Premium
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-4">
          <div className="flex gap-1 text-gray-100 font-semibold">
            {pages.map((page, ind) => (
              <button
                onClick={() => setSelected(page)}
                className={
                  selected === page
                    ? "bg-violet-500 p-1  rounded-sm"
                    : "bg-gray-600 p-1  rounded-sm"
                }
                key={ind}>
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={
          display
            ? "absolute top-0 h-screen w-full flex items-center justify-center"
            : "hidden"
        }>
        <div className="p-6 rounded-md shadow-md bg-gray-900 text-gray-50 flex flex-col space-y-3 justify-center items-center">
          <h2>Please Give feedback and make decline</h2>
          <form onSubmit={handleDeclineSubmit}>
            <input
              type="text"
              name="info"
              className="bg-gray-300 text-gray-800 p-2 rounded-md"
            />
            <br />
            <input
              type="submit"
              className="bg-orange-700 w-full mt-4 p-1 rounded-lg"
              value="Decline"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AllArticleAdmin;
