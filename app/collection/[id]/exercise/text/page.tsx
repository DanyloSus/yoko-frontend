import TranslationBubble from "@/components/exercises/TranslationBubble";
import React from "react";

const TextExercise = () => {
  return (
    <div className="text-center flex flex-col gap-[24px]">
      <h1 className="text-h1 leading-[96px] mt-[40px]">
        English to Ukrainian Translation
      </h1>
      <TranslationBubble
        englishText={["I", "love", "learning", "new", "languages."]}
        ukrainianText={["Я", "люблю", "вивчати", "нові", "мови."]}
      />
    </div>
  );
};

export default TextExercise;
