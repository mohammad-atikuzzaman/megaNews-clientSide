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
  // console.log(articleVsPublisher);

  const options = {
    title: "Article vs. Publisher comparison",
  };

  return (
    <div className="mx-auto ml-2">
      <h2 className="bg-gray-800 p-4 text-4xl font-bold mb-2">The Analytics Of Article and publisher</h2>
      <div>
        <h2 className="font-semibold text-3xl bg-gray-800 text-gray-400">
          Pie chart
        </h2>
        <Chart
          chartType="PieChart"
          data={articleVsPublisher}
          options={options}
          width="80%"
          height="400px"
        />
      </div>
      <div>
        <h2 className="font-semibold text-3xl bg-gray-800 text-gray-400">
          Column chart
        </h2>
        <Chart
          chartType="ColumnChart"
          data={articleVsPublisher}
          options={options}
          width="80%"
          height="400px"></Chart>
      </div>
      <div>
        <h2 className="font-semibold text-3xl bg-gray-800 text-gray-400">
          Scatter chart
        </h2>
        <Chart
          chartType="ScatterChart"
          data={articleVsPublisher}
          options={options}
          width="80%"
          height="400px"></Chart>
      </div>
    </div>
  );
};

export default DashboardStatistics;
