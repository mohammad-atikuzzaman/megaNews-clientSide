import { useContext, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextComponent";

const Navbar = () => {
  const [disMobMenu, setDisMobMenu]= useState(true)
  const { user, logOut } = useContext(AuthContext);
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
      <div className="container flex items-center justify-between h-16 mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setDisMobMenu(!disMobMenu)}
                className="p-4 md:hidden">
                <IoMenu className="text-2xl"></IoMenu>
              </button>
              <div className="absolute md:hidden">
                <ul
                  className={
                    disMobMenu
                      ? "block space-y-2  bg-gray-800 p-2  border border-dashed"
                      : "hidden"
                  }>
                  {menu}
                </ul>
              </div>
            </div>
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

        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <img
                alt="user name"
                className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100"
                src={user?.photoURL}
              />
              <button
                onClick={() => logOut()}
                className="px-3 py-2 bg-yellow-500 rounded-lg">
                LogOut
              </button>
            </div>
          ) : (
            <div className="items-center flex gap-2">
              <button className=" px-3 py-2 md:px-8 md:py-3 font-semibold rounded bg-violet-400 text-gray-900">
                Log in
              </button>
              <Link
                to="/register"
                className="px-3 py-2  md:px-8 md:py-3 font-semibold rounded bg-violet-400 text-gray-900">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
