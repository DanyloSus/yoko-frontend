import React from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement);

export const data = {
  labels: ["Learned", "Residue"],
  datasets: [
    {
      label: "Пройдених слів",
      data: [12, 19],
      backgroundColor: ["#6D64E8", "#B5B2B3"],
    },
  ],
};

const PieStatistic = () => {
  return (
    <div className="flex flex-col items-center max-h-[275px] mx-auto">
      <h4 className="text-h6 sm:text-h4">Пройдених слів</h4>
      <Pie
        data={data}
        options={{
          events: [],
          responsive: true,
        }}
      />
    </div>
  );
};

export default PieStatistic;
