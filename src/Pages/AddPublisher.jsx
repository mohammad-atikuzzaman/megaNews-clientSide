import { useForm } from "react-hook-form";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import axios from "axios";
import Swal from "sweetalert2";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;


const AddPublisher = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosPrivet();

  const onSubmit = async (data) => {
    const imageFile = { image: data.file[0] };

    const res = await axios.post(imageHostingApi, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(res.data, "img data");
    if (res.data.success) {
      const publisherInfo = {
        publisherName: data.name,
        logo: res.data.data.display_url,
      };
      // console.log(publisherInfo);
      axiosSecure.post("/publisher", publisherInfo)
      .then(dbRes =>{
        if(dbRes.data.insertedId){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Publisher added",
            showConfirmButton: false,
            timer: 1500,
          });
          reset()
        }
      })
    }
  };
  return (
    <div>
      <h2 className="text-3xl font-bold ml-6 p-4 mt-6">
        Please add a Publisher
      </h2>
      <div className="bg-gray-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-12 p-8 bg-gray-500 ml-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="publisherName"
                className="block mb-2 text-lg font-medium">
                Publisher Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                id="publisherName"
                placeholder="Publisher Name"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-200"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  Publisher Name is required
                </span>
              )}
            </div>
            <div>
              <label htmlFor="files" className="block text-lg font-medium">
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
          <div className="space-y-2">
            <div>
              <input
                className="cursor-pointer w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900"
                type="submit"
                value="Submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPublisher;
