import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const [displayPass, setDisplayPass] = useState(true);
  const { logInWithEmailPass, logInWithGoogle } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data) => {
    const { email, password } = data;
    logInWithEmailPass(email, password)
      .then((res) => {
        console.log(res.user.displayName);

        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.user.displayName} login successful`,
          showConfirmButton: false,
          timer: 1000,
        });

        if (location?.state) {
          navigate(location?.state);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.user.displayName} login successful`,
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col my-6 max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100 mx-auto">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Login</h1>
        <p className="text-sm text-gray-400">Login to access your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
            />
          </div>
          <div className="relative">
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              type={displayPass ? "password" : "text"}
              {...register("password")}
              id="password"
              placeholder="******"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
            />
            <FaEye
              onClick={() => setDisplayPass(!displayPass)}
              className="absolute top-10 right-5 cursor-pointer"></FaEye>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <input
              className=" cursor-pointer w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900"
              type="submit"
              value="Login"
            />
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?
            <Link to="/register" className="hover:underline text-violet-400">
              SignUp
            </Link>
          </p>
        </div>
      </form>
      <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          className=" mx-auto w-full flex items-center justify-center gap-4 border-2 border-violet-400 p-2 rounded-md">
          <FaGoogle></FaGoogle>
          <p>Login with google</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
