import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export const data = {
  labels: ["Some1", "Some2", "Some3", "Some4", "Some5", "Some6", "Some7"],
  datasets: [
    {
      data: [50, 60, 10, 0, 100, 20, 75],
    },
  ],
};

const ColumnStatistic = () => {
  return (
    <div className="flex flex-col items-center max-h-[275px]  mx-auto">
      <h4 className="text-h6 sm:text-h4">Повторів</h4>
      <Bar
        data={data}
        options={{
          backgroundColor: "#6D64E8",
          events: [],
          scales: {
            x: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
                drawTicks: false,
              },
              border: {
                display: false,
              },
            },
            y: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
                drawTicks: false,
              },
              border: {
                display: false,
              },
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default ColumnStatistic;
