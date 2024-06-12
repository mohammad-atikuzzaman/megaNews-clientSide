import { useQuery } from "@tanstack/react-query";
import useAxiosPrivet from "../Hooks/useAxiosPrivet";
import Chart from "react-google-charts";
import { useState } from "react";

const DashboardStatistics = () => {
  const axiosSecure = useAxiosPrivet();
  const { data: articleVsPublisher } = useQuery({
    queryKey: ["articleVsPublisher"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publisher-article-count");
      return res.data;
    },
  });
  console.log(articleVsPublisher);

  const options = {
    title: "Article vs. Publisher comparison",
  };


  return (
    <div className="mx-auto">
      <h2>theis is analicsic page</h2>
      <div>
        <h2>Pie charts</h2>
        <Chart
          chartType="PieChart"
          data={articleVsPublisher}
          options={options}
          width="80%"
          height="400px"
        />
      </div>
      <div>
        <Chart
        chartType="ColumnChart"
        data={articleVsPublisher}
        options={options}
        width="80%"
        height="400px"
        >

        </Chart>
      </div>
      <div>
        <Chart
        chartType="ScatterChart"
        data={articleVsPublisher}
        options={options}
        width="80%"
        height="400px"
        >

        </Chart>
      </div>
    </div>
  );
};

export default DashboardStatistics;
