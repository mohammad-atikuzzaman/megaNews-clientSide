import { useState } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxuisPublic from "../Hooks/useAxuisPublic";
const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Register = () => {
  const { registerWithEmailPass, updateUserProfile, logInWithGoogle } =
    useAuth();
  const [displayPass, setDisplayPass] = useState(true);
  const [spiner, setSpiner] = useState(false);
  const axiosPublic = useAxuisPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSpiner(true);
    const imageFile = { image: data.file[0] };
    const res = await axios.post(imageHostingApi, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const userInfo = {
        userName: data?.user,
        userEmail: data?.email,
        image: res.data?.data?.display_url,
      };
      const photo = res.data?.data?.display_url;
      const { email, password, user } = data;
      // console.log(userInfo)
      registerWithEmailPass(email, password)
        .then((fire) => {
          updateUserProfile(user, photo)
            .then(() => {
              axiosPublic
                .post("/users", userInfo)
                .then((res) => {
                  // console.log("success", res)
                })
                .catch((err) => {
                  // console.log(err)
                });
              navigate("/");
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${fire.user.displayName} Signed up successful`,
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              // console.log(err);
            });
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((res) => {
        // console.log(res.user);
        const userInfo = {
          userName: res.user?.displayName,
          userEmail: res.user?.email,
          image: res.user?.photoURL,
        };
        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            // console.log(res.data)
          })
          .catch((err) => {
            // console.log(err)
          });
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.user.displayName} login successful`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div className="flex flex-col my-6 max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100 mx-auto">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
        <p className="text-sm text-gray-400">Sign Up to Join Us</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="userName" className="block mb-2 text-sm">
              User Name
            </label>
            <input
              type="text"
              {...register("user", { required: true })}
              id="userName"
              placeholder="User Name"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
            />
            {errors.user && (
              <span className="text-red-500 text-sm">
                User Name is required
              </span>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>
          <div className="relative">
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              type={displayPass ? "password" : "text"}
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              id="password"
              placeholder="******"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500 text-sm">
                Password must be min 6 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500 text-sm">
                Password must be a uppercase, a lowercase, special char and a
                numeric value
              </span>
            )}
            <FaEye
              onClick={() => setDisplayPass(!displayPass)}
              className="absolute top-10 right-5 cursor-pointer"></FaEye>
          </div>
          <div>
            <label htmlFor="files" className="block text-sm font-medium">
              Attachments
            </label>
            <div className="flex">
              <input
                type="file"
                {...register("file", { required: true })}
                id="files"
                accept="image/*"
                className=" border-2 border-dashed border-gray-700 w-full rounded-md "
              />
              {errors.file && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <input
              className={
                spiner
                  ? " cursor-pointer w-full px-8 py-3 font-semibold rounded-md bg-gray-400 text-gray-900"
                  : " cursor-pointer w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900"
              }
              type="submit"
              value={spiner ? "Loading..." : "Sign up"}
            />
          </div>

          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?
            <Link to="/login" className="hover:underline text-violet-400">
              Login
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

export default Register;
