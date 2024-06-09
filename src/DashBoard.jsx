import { FaRepublican, FaUsers } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="flex container mx-auto bg-gray-100">
      <div className="w-[15%] bg-gray-500">
        <ul className=" h-screen max-w-full space-y-2 font-serif text-xl">
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
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
