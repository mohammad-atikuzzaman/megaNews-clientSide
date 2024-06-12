import Swal from "sweetalert2";

const ContactUs = () => {
  return (
    <div className="bg-gray-800 my-4">
      <h2 className="font-bold text-3xl text-center p-4 text-gray-400">
        Contact Us
      </h2>
      <div className="flex flex-row-reverse justify-between w-full md:w-[70%] lg:w-[50%] mx-auto gap-4">
        <div className="p-4 text-gray-400  border-l ">
          <p>
            You can contact us for many kind of things without login or register , So please
            contact us
          </p>
        </div>
        <div className="w-full pb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Feedback send successful",
                showConfirmButton: false,
                timer: 1500,
              });
            }}
            className="w-full space-y-2">
            <div>
              <label htmlFor="name" className="font-semibold text-gray-400">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                id="name"
                className="w-full p-2 rounded-md border-2 border-gray-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold text-gray-400">
                Your Email
              </label>
              <input
                type="email"
                required
                name="email"
                placeholder="Your Name"
                id="email"
                className="w-full p-2 rounded-md border-2 border-gray-500"
              />
            </div>
            <br />
            <div>
              <label htmlFor="comment" className="font-semibold text-gray-400">
                Your Message
              </label>
              <textarea
                name="comment"
                required
                id="comment"
                placeholder="Your Feedback"
                className="w-full p-2 rounded-md border-2 border-gray-500"></textarea>
              <br />
            </div>
            <input
              type="submit"
              value="Submit"
              className="bg-gray-400 p-2 rounded-md font-semibold text-gray-800"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
