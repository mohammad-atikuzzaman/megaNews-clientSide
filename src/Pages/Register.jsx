import { useState } from "react";
import { FaEye } from "react-icons/fa";

const Register = () => {
  const [displayPass, setDisplayPass] = useState(false);

  const handleSingUp = (e) => {
    e.preventDefault();
    const form = e.target;
    // const email = form.email.value;
    // const name = form.userName.value;
    // const password = form.password.value;
    const getPhoto = form.files.files[0];
    // console.log(getPhoto);
    if (getPhoto) {
      const formData = new FormData();
      formData.append("photo", getPhoto);

      const apiKey = "2d82b387e624a7d330a8898ccabbbd09";
      const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <div className="flex flex-col my-6 max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100 mx-auto">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
        <p className="text-sm text-gray-400">Sign Up to Join Us</p>
      </div>
      <form onSubmit={handleSingUp} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="userName" className="block mb-2 text-sm">
              User Name
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="User Name"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
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
              name="password"
              id="password"
              placeholder="******"
              className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
            />
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
                name="files"
                id="files"
                accept="image/*"
                className=" border-2 border-dashed border-gray-700 w-full rounded-md "
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <input
              className=" cursor-pointer w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900"
              type="submit"
              value="Sign Up"
            />
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            Don't have an account yet?
            <a
              rel="noopener noreferrer"
              href="#"
              className="hover:underline text-violet-400">
              Sign up
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
