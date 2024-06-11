import { useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import useAxuisPublic from "../Hooks/useAxuisPublic";
import { useQuery } from "@tanstack/react-query";

const Carocel = () => {
  const axiosPublic = useAxuisPublic();
  const {data : trendings = []}= useQuery({
    queryKey: ["trendings"],
    queryFn: async()=>{
      const res = await axiosPublic.get("/trending")
      return res.data
    }
  })
  // console.log(trendings)
  return (
    <AwesomeSlider>
      {trendings.map((trending) => (
        <div key={trending._id} data-src={trending.image} />
      ))}
    </AwesomeSlider>
  );
};

export default Carocel;
