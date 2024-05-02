import TestComponent from "@/components/exercises/TestComponent";
import React from "react";

const QuizExercise = () => {
  const englishText = ["I", "love", "learning", "new", "languages."];
  const ukrainianText = ["Я", "люблю", "вивчати", "нові", "мови."];

  return (
    <div>
      <TestComponent englishText={englishText} ukrainianText={ukrainianText} />
    </div>
  );
};

export default QuizExercise;
