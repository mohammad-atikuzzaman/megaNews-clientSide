import Swal from "sweetalert2";

const GiveFeedBack = () => {
  return (
    <div className="bg-gray-800 my-4">
      <h2 className="font-bold text-3xl text-center p-4 text-gray-400">
        Give Us Your Feedback
      </h2>
      <div className="flex justify-between w-full md:w-[70%] lg:w-[50%] mx-auto gap-4">
        <div className="p-4 text-gray-400  border-r ">
          <p>
            You can give us your Feedback without login or register , So please
            give us your feedback
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
                placeholder="Your Name"
                id="name"
                className="w-full p-2 rounded-md border-2 border-gray-500"
              />
            </div>
            <br />
            <div>
              <label htmlFor="comment" className="font-semibold text-gray-400">
                Your Feedback
              </label>
              <textarea
                name="comment"
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

export default GiveFeedBack;
