import React from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement);

type Props = {
  wordsLearned: number;
  wordsCount: number;
};

const PieStatistic = (props: Props) => {
  const data = {
    labels: ["Learned", "Residue"],
    datasets: [
      {
        label: "Пройдених слів",
        data: [props.wordsLearned, props.wordsCount - props.wordsLearned],
        backgroundColor: ["#6D64E8", "#B5B2B3"],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center max-h-[275px] mx-auto">
      <h4 className="text-h6 sm:text-h4">Пройдених слів</h4>
      <Pie
        data={data}
        options={{
          events: [],
          responsive: true,
          borderColor: "rgba(0,0,0,0)",
        }}
      />
    </div>
  );
};

export default PieStatistic;
