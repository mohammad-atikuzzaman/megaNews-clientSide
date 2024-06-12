import { FaDashcube, FaHome, FaRepublican, FaUsers } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DashBoard = () => {
  return (
    <div className="flex container mx-auto bg-gray-100">
      <div className="md:w-[15%] bg-gray-500">
        <ul className=" h-screen max-w-full space-y-2 font-serif text-xl">
          <li className="flex items-center gap-3 p-2">
            <FaDashcube></FaDashcube>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li className="flex items-center gap-3 p-2">
            <FaUsers></FaUsers>
            <NavLink to="/dashboard/users">All users</NavLink>
          </li>
          <li className="flex items-center gap-3 p-2">
            <MdArticle></MdArticle>
            <NavLink to="/dashboard/all-article">All Article</NavLink>
          </li>
          <li className="flex items-center gap-3 p-2">
            <FaRepublican></FaRepublican>
            <NavLink to="/dashboard/add-publisher">Add Publisher</NavLink>
          </li>
          <hr className="mx-3"/>
          <li className="flex items-center gap-3 p-2">
            <FaHome></FaHome>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 md:w-[85%]">
        <Outlet></Outlet>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default DashBoard;
