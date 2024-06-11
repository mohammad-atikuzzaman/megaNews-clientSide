import usePublisher from "../Hooks/usePublisher";

const Publishers = () => {
  const [publishers]= usePublisher()
  // console.log(publishers)
  return (
    <div className="mt-10 bg-gray-800 p-4 text-gray-400">
      <h2 className="text-center font-bold text-4xl p-4">The Publishers</h2>
      <hr className="py-3" />
      <div className="flex justify-around flex-wrap">
        {publishers.map((publisher) => (
          <div key={publisher._id} className="flex flex-col items-center">
            <img
              src={publisher.logo}
              alt=""
              className="w-16 h-16 border-2 rounded-full"
            />
            <h2 className=" font-medium"> {publisher.publisherName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Publishers;