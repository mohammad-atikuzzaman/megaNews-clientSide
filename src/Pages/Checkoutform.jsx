import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import usePrice from "../Hooks/usePrice";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import useUserPremiam from "../Hooks/useUserPremiam";

const Checkoutform = () => {
  const [payError, setPayError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transectionId, setTransectionId] = useState("");
  const [display, setDisplay] = useState(false);
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosPrivet();
  const [priceData, isLoading] = usePrice();
  const [ , ,isPremiumRefetch] = useUserPremiam()
  // console.log(priceData);

  const handleLoadPayData = () => {
    setDisplay(!display);
    axiosSecure
      .post("/create-payment-intent", { price: priceData?.price })
      .then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  };

  const handleClearCartData = () => {
    axiosSecure.delete(`/price/${user?.email}`).then((res) => {
      // console.log(res.data);
    });
  };

  const handleMakeUserPremium = () => {
    const getPlanTime = new Date().toLocaleString();
    // console.log(getPlanTime);
    axiosSecure
      .patch(`/usersPremium/${user?.email}`, {
        type: "premium",
        planTime: priceData?.time,
        timeOfGetPlan: getPlanTime,
      })
      .then((res) => {
        // console.log(res.data);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      // console.log("card not found");
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      // console.log("payment error", error);
      setPayError(error.message);
    } else {
      // console.log("payment method", paymentMethod);
      setPayError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      // console.log("confirmError", confirmError)
      setPayError(confirmError);
    } else {
      // console.log("paymentIntent",paymentIntent)
      setPayError("");
      if (paymentIntent.status === "succeeded") {
        setTransectionId(paymentIntent.id);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Subscription taken successful`,
          showConfirmButton: false,
          timer: 1500,
        });
        
        handleClearCartData();
        handleMakeUserPremium();
        isPremiumRefetch()

      }
    }
  };
  return (
    <div className="">
      <div className="w-full flex flex-col items-center">
        <h1 className="font-semibold text-center">
          Do not Reload in this Page
        </h1>
        <button
          onClick={handleLoadPayData}
          disabled={isLoading}
          className={
            isLoading
              ? "bg-gray-800 p-2 m-4 w-full text-gray-200 font-semibold rounded-md"
              : "bg-purple-500 p-2 m-4 w-full text-gray-200 font-semibold rounded-md hover:scale-105"
          }>
          Click here to see Paynment process
        </button>
      </div>
      <form onSubmit={handleSubmit} className={display ? "block" : "hidden"}>
        <CardElement
          className="bg-gray-400 p-2 mb-5 text-violet-500"
          options={{
            style: {
              base: {
                fontSize: "16px",
                "::placeholder": {
                  color: "#fff",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="bg-violet-500 px-4 py-2 rounded-md w-full "
          type="submit"
          disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red-600 text-sm">{payError}</p>
        {transectionId && (
          <p className="text-green-600 text-sm">
            Your Transaction Id : {transectionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default Checkoutform;
