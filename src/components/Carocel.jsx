import { useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import useAxuisPublic from "../Hooks/useAxuisPublic";

const Carocel = () => {
  const axiosPublic = useAxuisPublic();
  const [trendings, setTrending] = useState([]);

  useState(() => {
    axiosPublic.get("/trending").then((res) => {
      setTrending(res.data);
      console.log(res.data.length)
      console.log(res.data)
    });
  }, []);
  return (
    <AwesomeSlider>
      {trendings.map((trending) => (
        <div key={trending._id}>
          <img
            src={trending.image}
            alt=""
            className="w-screen-xl"
          />
        </div>
      ))}
    </AwesomeSlider>
  );
};

export default Carocel;
