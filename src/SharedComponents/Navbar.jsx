import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const menu = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-violet-400 border- border-b-2 border-violet-400 p-2"
              : ""
          }
          to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-violet-400 border- border-b-2 border-violet-400 p-2"
              : ""
          }
          to="/add-articles">
          Add Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-violet-400 border- border-b-2 border-violet-400 p-2"
              : ""
          }
          to="/all-articles">
          All Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-violet-400 border- border-b-2 border-violet-400 p-2"
              : ""
          }
          to="/subscription">
          Subscription
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-violet-400 border- border-b-2 border-violet-400 p-2"
              : ""
          }
          to="/dashboard">
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-violet-400 border- border-b-2 border-violet-400 p-2"
              : ""
          }
          to="/my-articles">
          My Articles
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="p-2 bg-gray-800 text-gray-100">
      <div className="container flex justify-between h-16 mx-auto">
        <div className="flex items-center gap-6">
          <div>
            <Link
              to="/"
              className="p-2 text-xl md:text-2xl lg:text-3xl font-bold">
              Mega News
            </Link>
          </div>
          <div>
            <ul className="hidden md:flex gap-4">{menu}</ul>
          </div>
        </div>
        <div className="items-center hidden md:flex gap-2">
          <button className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900">
            Log in
          </button>
          <Link to="/register" className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900">
            Sign Up
          </Link>
        </div>
        <button className="p-4 md:hidden">
          <IoMenu className="text-2xl"></IoMenu>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
