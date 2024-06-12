import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import Swal from "sweetalert2";
const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { user, updateUserProfile, setLoading } = useAuth();
  const axiosSecure = useAxiosPrivet();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.file[0] };
    const res = await axios.post(imageHostingApi, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      updateUserProfile(data?.name, res.data?.data?.display_url)
        .then(() => {
          setLoading(true);
          axiosSecure
            .patch(`/usersPremium/${user?.email}`, {
              userName: data?.name,
              image: res.data?.data?.display_url,
            })
            .then((DBRes) => {
              // console.log("res by db", DBRes.data);
              if (DBRes.data.modifiedCount > 0) {
                setLoading(false)
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: `Profile update successful`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container mx-auto bg-gray-800 my-4">
      <h2 className="font-bold text-3xl text-center text-gray-400">Profile </h2>
      <div className="flex justify-between items-center">
        <div className="w-full">
          <img src={user?.photoURL} alt="" />
        </div>
        <div className="w-full p-4">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setEdit(!edit)}
              className="bg-violet-400 p-2 rounded-md text-right">
              Edit Profile
            </button>
          </div>
          <p className="w-full bg-gray-400 p-3 font-semibold mb-7 rounded-md">
            Email : {user?.email}
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
            <div>
              <label htmlFor="name" className="font-semibold text-gray-400">
                User Name :
              </label>
              <input
                type="text"
                disabled={!edit}
                id="name"
                className="w-full p-2 rounded-md font-semibold"
                {...register("name", { required: true })}
                defaultValue={user?.displayName}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  User Name is required
                </span>
              )}
            </div>

            <div>
              <input
                type="file"
                className={
                  edit ? "w-full border border-dashed p-1 rounded-md" : "hidden"
                }
                disabled={!edit}
                id=""
                accept="image/*"
                {...register("file", { required: true })}
              />
              {errors.file && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <input
              disabled={!edit}
              type="submit"
              value="Update"
              className={
                edit
                  ? "bg-violet-400 w-full p-1 rounded-md font-semibold text-gray-100 cursor-pointer hover:scale-105"
                  : "hidden"
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
