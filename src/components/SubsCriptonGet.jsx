import { Link } from "react-router-dom";

const SubsCriptonGet = () => {
  return (
    <div className="bg-gray-800 my-4 space-y-6">
      <div className="text-center pt-4">
        <h2 className="text-4xl font-bold text-gray-400">Plans</h2>
      </div>
      <hr className="mx-4" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-3">
        <div className="rounded-md shadow-md text-gray-100 border-2 p-2 border-gray-400">
          <h2 className="px-2 ml-6 mt-6 rounded-md bg-gray-400 inline-block font-semibold">
            Free
          </h2>
          <div className="flex flex-col justify-between p-6 space-y-8">
            <h2>You Will Get</h2>
            <ul className="list-disc ml-6">
              <li>A Free Account</li>
              <li>Read Free Articles</li>
              <li>Post a Article</li>
            </ul>
            <Link to="/subscription">
              <button
                type="button"
                className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md border-2 border-gray-400">
                Get Free
              </button>
            </Link>
          </div>
          <p className="text-sm p-2 mx-6 text-center">
            If You Register, Already you will get a free account. If you don't
            register please register and get a free account
          </p>
        </div>
        <div className="rounded-md shadow-md text-amber-400 border-2 p-2 border-amber-400">
          <div className="flex justify-between items-center mx-6 mt-6">
            <div>
              <h2 className="px-2 rounded-md bg-amber-400 text-gray-100 font-semibold">
                Gold
              </h2>
            </div>
            <div>
              <p>$10 usd</p>
              <span>Per Month</span>
            </div>
          </div>
          <div className="flex flex-col justify-between p-6 space-y-8">
            <h2>You Will Get</h2>
            <ul className="list-disc ml-6">
              <li>A Gold Account</li>
              <li>Read all Articles</li>
              <li>Post Article</li>
              <li>Delete Article</li>
              <li>Edit Article</li>
            </ul>
            <Link to="/subscription">
              <button
                type="button"
                className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md border-2 border-amber-400">
                Get Gold
              </button>
            </Link>
          </div>
          <p className="text-sm p-2 mx-6 text-center">
            If You Register, Already you will get a free account. If you don't
            register please register and get a free account
          </p>
        </div>
        <div className="rounded-md shadow-md text-blue-200 border-2 p-2 border-blue-200">
          <div className="flex justify-between items-center mx-6 mt-6">
            <div>
              <h2 className="px-2 rounded-md bg-blue-200 text-gray-800 font-semibold">
                Platinum
              </h2>
            </div>
            <div>
              <p>$1000 usd</p>
              <span>Life time access</span>
            </div>
          </div>
          <div className="flex flex-col justify-between p-6 space-y-8">
            <h2>You Will Get</h2>
            <ul className="list-disc ml-6">
              <li>A Platinum Account</li>
              <li>Read all Articles</li>
              <li>Post Article</li>
              <li>Delete Article</li>
              <li>Edit Article</li>
            </ul>
            <Link to="/subscription">
              <button
                type="button"
                className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md border-2 border-blue-200">
                Get Platinum
              </button>
            </Link>
          </div>
          <p className="text-sm p-2 mx-6 text-center">
            If You Register, Already you will get a free account. If you don't
            register please register and get a free account
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubsCriptonGet;
