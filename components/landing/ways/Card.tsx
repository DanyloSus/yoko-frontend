import React from "react";
import Card from "@/components/exercises/Card";

const CardExercise = () => {
  return (
    <div className="max-w-[360px] w-full h-full min-h-[294px]">
      <Card
        back={() => {}}
        englishWord="Hello"
        forward={() => {}}
        ukrainianWord="Вітаю"
        isSmall
        texts={{
          back: "",
          save: "",
          translate: "",
        }}
      />
    </div>
  );
};

export default CardExercise;
