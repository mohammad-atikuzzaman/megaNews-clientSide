import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import useAuth from "../Hooks/useAuth";
import { FaDotCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

const MyArticle = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosPrivet();

  const { data: allArticle = [], refetch } = useQuery({
    queryKey: ["allArticleData"],
    queryFn: async () => {
      const res = await axiosSecure(`/authors-article/${user?.email}`);
      return res.data;
    },
  });
  // console.log("all article", allArticle);
  const handleDelete = (id) => {
    axiosSecure.delete(`/delete-article/${id}`).then((res) => {
      // console.log(res.data);
      refetch();
      if (res.data.deletedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Article Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
 
  const [reason, setReason] = useState("")
  const [display, setDisplay]= useState(false)
  // console.log(reason)

  return (
    <div className="container mx-auto ">
      <h2 className="text-3xl text-center font-bold my-6">My Articles</h2>
      <div className="relative">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Details</th>
              <th>Status</th>
              <th>Reason</th>
              <th>isPremium</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="border border-t-gray-800">
            {allArticle.map((article, index) => (
              <tr
                key={article._id}
                className={index % 2 === 1 ? "bg-gray-300" : "bg-gray-400"}>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>
                  <Link to={`/article-details/${article?._id}`}>
                    <button className="bg-gray-500 p-1 rounded-lg text-white hover:scale-105 transition-all">
                      Details
                    </button>
                  </Link>
                </td>
                <td>
                  {article?.status === "approved" && (
                    <div className="text-green-700 flex items-center gap-2 justify-center">
                      <FaDotCircle></FaDotCircle>
                      {article.status}
                    </div>
                  )}
                  {article?.status === "declined" && (
                    <div className="text-orange-700 flex items-center gap-2 justify-center">
                      <FaDotCircle></FaDotCircle>
                      {article.status}
                    </div>
                  )}
                  {article?.status === "pending" && (
                    <div className="text-yellow-400 flex items-center gap-2 justify-center">
                      <FaDotCircle></FaDotCircle>
                      {article.status}
                    </div>
                  )}
                </td>
                <td>
                  {article?.status === "declined" ? (
                    <button
                      onClick={() =>{
                         setReason(article?.reason);
                         setDisplay(!display)
                      } }
                      className="bg-orange-500 text-white p-1 rounded-md ">
                      See Reason
                    </button>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {article?.type === "premium" ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-red-700">No</span>
                  )}
                </td>

                <td>
                  <Link to={`/article-update/${article?._id}`}>
                    <button className="p-2 bg-orange-800  text-white rounded-md">
                      Update
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(article?._id)}
                    className="p-2 bg-red-700 text-white rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={display ? "absolute top-0 w-full h-full  flex justify-center items-center bg-[#504f4f3b] ": "hidden"}>
          <div className="bg-gray-800 p-6 w-[50%] mx-auto text-center text-white rounded-md">
            <h2 className="text-xl">The reason</h2>
            <hr />
            <p>{reason}</p>
            <button onClick={()=> setDisplay(!display)} className="mt-4"><MdCancel className="text-3xl"></MdCancel></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyArticle;
