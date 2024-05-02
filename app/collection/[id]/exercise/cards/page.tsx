import CardComponents from "@/components/exercises/CardComponents";
import React from "react";

const CardExercise = () => {
  const englishText = ["I", "love", "learning", "new", "languages."];
  const ukrainianText = ["Я", "люблю", "вивчати", "нові", "мови."];

  return (
    <CardComponents englishText={englishText} ukrainianText={ukrainianText} />
  );
};

export default CardExercise;
