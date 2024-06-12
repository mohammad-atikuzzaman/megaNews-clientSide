import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkoutform from "./Checkoutform";
// todo: publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const PaymentPage = () => {
  return (
    <div className="container mx-auto my-6 bg-gray-800 p-7">
      <div className= "w-full md:w-1/2 mx-auto bg-gray-200 p-6 rounded-md">
        <Elements stripe={stripePromise}>
          <Checkoutform></Checkoutform>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;