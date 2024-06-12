import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import usePrice from "../Hooks/usePrice";

const Subscription = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosPrivet();
  const [priceData, isLoading, refetch] = usePrice();
  // console.log(priceData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = parseInt(e.target.plan.value);
    // console.log(value);

    if (value === 1) {
      axiosSecure
        .post("/price", { time: value, price: 1, email: user?.email })
        .then((res) => {
          // console.log(res.data);
          if (res.data.acknowledged) {
            refetch();
          }
        });
    } else if (value === 7200) {
      axiosSecure
        .post("/price", { time: value, price: 5, email: user?.email })
        .then((res) => {
          // console.log(res.data);
          if (res.data.acknowledged) {
            refetch();
          }
        });
    } else if (value === 14400) {
      axiosSecure
        .post("/price", { time: value, price: 8, email: user?.email })
        .then((res) => {
          // console.log(res.data);
          if (res.data.acknowledged) {
            refetch();
          }
        });
    }
    refetch();
    navigate("/payment");
  };
  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-center text-4xl my-4">
        Get A Subscription
      </h2>
      <div className="bg-gray-800 text-gray-300 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold my-4">
            Unlock Exclusive Insights: Subscribe Now for Trending Articles and
            Stay Ahead of the Curve!
          </h2>
          <p>
            Join Our Community of Trendsetters! Subscribe Today to Gain
            Unlimited Access to the Hottest Articles, In-Depth Analysis, and
            Insider Insights. Stay Informed, Inspired, and Ahead of the Curve
            with the Latest Trends Delivered Straight to Your Inbox. Don’t Miss
            Out – Elevate Your Knowledge and Influence Now!
          </p>
        </div>
        <hr className="my-6" />
        <h2 className="font-semibold text-xl  mb-4">Chose a Plan and Get It</h2>

        <form onSubmit={handleSubmit}>
          {/* all value set in minutes */}
          <select
            name="plan"
            id=""
            className="w-full min-h-10 p-3 text-violet-500 font-semibold rounded-md">
            <option value="1">1 minute || $1 USD</option>
            <option value="7200">5 days || $5 USD</option>
            <option value="14400">10 days || $8USD</option>
          </select>
          <br />
          <input
            type="submit"
            value="Get Now"
            className="w-full bg-violet-500 my-4 p-2 font-semibold rounded-md hover:scale-95 transition-all"
          />
        </form>
      </div>
    </div>
  );
};

export default Subscription;
