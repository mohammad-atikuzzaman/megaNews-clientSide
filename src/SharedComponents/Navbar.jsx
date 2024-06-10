import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingScreen from "./LoadingScreen";
import { toast } from "react-toastify";
import useAdmin from "../Hooks/useAdmin";
import useUserPremiam from "../Hooks/useUserPremiam";

const Navbar = () => {
  const [disMobMenu, setDisMobMenu] = useState(false);
  const [disMobProfile, setDisMobProfile] = useState(false);
  const { user, logOut, loading } = useAuth();
  const [isAdmin] = useAdmin();
  const [isPremium] = useUserPremiam();

  const menu = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-violet-400 border- border-b-2 border-violet-400 md:p-2"
              : ""
          }
          to="/">
          Home
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-violet-400 border- border-b-2 border-violet-400 md:p-2"
                : ""
            }
            to="/add-article">
            Add Articles
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-violet-400 border- border-b-2 border-violet-400 md:p-2"
              : ""
          }
          to="/all-articles">
          All Articles
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-violet-400 border- border-b-2 border-violet-400 md:p-2"
                : ""
            }
            to="/subscription">
            Subscription
          </NavLink>
        </li>
      )}
      {isAdmin ? (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-violet-400 border- border-b-2 border-violet-400 md:p-2"
                : ""
            }
            to="/dashboard">
            Dashboard
          </NavLink>
        </li>
      ) : (
        ""
      )}
      {isPremium ? (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-violet-400 border- border-b-2 border-violet-400 md:p-2"
                : ""
            }
            to="/premium-articles">
            Premium Article
          </NavLink>
        </li>
      ) : (
        ""
      )}
      {user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-violet-400 border- border-b-2 border-violet-400 md:p-2"
                : ""
            }
            to="/my-articles">
            My Articles
          </NavLink>
        </li>
      )}
    </>
  );
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.warn("Account logged out");
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
  };
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
              <div className="absolute md:hidden z-10">
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
          {loading ? (
            <LoadingScreen></LoadingScreen>
          ) : (
            <div>
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      alt="user name"
                      onClick={() => setDisMobProfile(!disMobProfile)}
                      title={user?.displayName}
                      className={`w-10 h-10 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 dark:ring-violet-600 dark:ring-offset-gray-100`}
                      src={user?.photoURL}
                    />
                    <div className="absolute right-0 md:-right-24 z-10">
                      <ul
                        className={
                          disMobProfile
                            ? "block space-y-2  bg-gray-800 p-2  border border-dashed"
                            : "hidden"
                        }>
                        <li className="bg-gray-500 px-1 rounded-lg">
                          {user?.displayName}
                        </li>
                        <li className="bg-gray-500 px-1 rounded-lg">
                          {user?.email}
                        </li>
                        <Link to="/profile" className="block">
                          <li className="bg-gray-500 px-1 rounded-lg">
                            Profile
                          </li>
                        </Link>
                        <li
                          onClick={handleLogOut}
                          className="bg-red-500 px-1 rounded-lg">
                          Log out
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={handleLogOut}
                    className="px-3 py-2 bg-violet-400 text-gray-900 rounded-lg hidden md:block">
                    LogOut
                  </button>
                </div>
              ) : (
                <div className="items-center flex gap-2">
                  <Link
                    to="/login"
                    className=" px-3 py-2 md:px-6 md:py-2 font-semibold rounded bg-violet-400 text-gray-900">
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2  md:px-6 md:py-2 font-semibold rounded bg-violet-400 text-gray-900">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
