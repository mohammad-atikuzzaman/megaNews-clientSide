import axios from "axios";
import useAuth from "../Hooks/useAuth";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useState } from "react";
import Swal from "sweetalert2";
import usePublisher from "../Hooks/usePublisher";
import moment from "moment";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const AddArticle = () => {
  const [publishers] = usePublisher();
  const [selectedOption, setSelectedOption] = useState([]);
  const axiosSecure = useAxiosPrivet();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const date = moment().format("LL");
    const imageFile = { image: data.file[0] };
    const res = await axios.post(imageHostingApi, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Please wait",
      showConfirmButton: false,
      timer: 1500,
    });
    if (res.data.success) {
      const publisherInfo = {
        title: data.title,
        detail: data.description,
        image: res.data.data.display_url,
        publisher: data.selectPub,
        tags: selectedOption,
        authorName: user?.displayName,
        authorEmail: user?.email,
        authorPhoto: user?.photoURL,
        postedDate: date,
        status: "pending",
        views: 0,
      };
      // console.log(publisherInfo);

      axiosSecure.post("/add-article", publisherInfo).then((dbRes) => {
        if (
          dbRes.data?.message ===
          "Please take a subscription to post another article"
        ) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Please take a subscription to post another article",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        if (dbRes.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Article added",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      });
    }
  };
  return (
    <div>
      <h2 className="font-bold text-4xl text-center">Please add a article</h2>
      <div>
        <section className="p-6 bg-gray-800 text-gray-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="container flex flex-col mx-auto space-y-12">
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900">
              <div className="space-y-2 col-span-full lg:col-span-1">
                <p className="font-medium">For Sharing Knowledge</p>
                <p className="text-xs">
                  Please join us and make a post to share a article.
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full">
                  <label htmlFor="title" className="text-sm">
                    First name
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...register("title", { required: true })}
                    placeholder="Article Tile"
                    className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700"
                  />
                  {errors.title && (
                    <span className="text-red-500 text-sm">
                      Article title is required
                    </span>
                  )}
                </div>
                <div className="col-span-full">
                  <label htmlFor="description" className="text-sm">
                    Article Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    {...register("description", { required: true })}
                    placeholder="Article Description"
                    className="w-full min-h-9 rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700"
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm">
                      Publisher Name is required
                    </span>
                  )}
                </div>
                <div className="col-span-full sm:col-span-4">
                  <div>
                    <label
                      htmlFor="files"
                      className="block text-lg font-medium">
                      Logo
                    </label>
                    <div className="flex">
                      <input
                        type="file"
                        {...register("file", { required: true })}
                        id="files"
                        accept="image/*"
                        className=" border-2 p-1 border-dashed border-gray-700 w-full rounded-md "
                      />
                      {errors.file && (
                        <span className="text-red-500 text-sm">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-full text-black sm:col-span-3">
                  <label className="block text-white text-lg font-medium">
                    Please select tags
                  </label>
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    isMulti={true}
                  />
                </div>
                <div className="col-span-full sm:col-span-2 text-black">
                  <label
                    htmlFor="publisher"
                    className="block text-white text-lg font-medium">
                    Please select a publisher
                  </label>
                  <select
                    id="publisher"
                    {...register("selectPub")}
                    className="w-full p-2 rounded-md">
                    {publishers.map((pub) => (
                      <option key={pub._id} value={pub.publisherName}>
                        {pub.publisherName}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="mx-auto bg-violet-400 w-full col-span-5 p-2 rounded-md text-semibold cursor-pointer"
                />
              </div>
            </fieldset>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddArticle;
