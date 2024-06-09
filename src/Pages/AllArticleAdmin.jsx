import { useEffect, useState } from "react";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";

const AllArticleAdmin = () => {
  const [allArticle, setAllArticle]= useState([])
  const axiosSecure = useAxiosPrivet()
  useEffect(()=>{
    axiosSecure.get("/all-article")
    .then(res =>{
      console.log(res.data)
      setAllArticle(res.data)
    })
  },[axiosSecure])
  return (
    <div>
      <h2 className="font-bold text-3xl ml-6 p-6">All Articles</h2>
      <div>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Profile</th>
              <th>Role</th>
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
                <td>{article.status}</td>
                <td><button className="p-2 bg-green-200 rounded-md">Approve</button></td>
                <td><button className="p-2 bg-green-200 rounded-md">Decline</button></td>
                <td><button className="p-2 bg-green-200 rounded-md">Delete</button></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllArticleAdmin;