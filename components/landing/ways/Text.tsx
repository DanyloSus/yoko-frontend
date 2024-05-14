import TranslationBubble from "@/components/exercises/TranslationBubble";
import React from "react";

const Text = () => {
  const en = ["Some", "sentence", "with", "some", "text."];
  const uk = ["Якесь", "речення", "із", "якимось", "текстом."];
  return (
    <p>
      {...en.map((word, index) => (
        <TranslationBubble
          key={index}
          text={`${word} `}
          translationUk={uk[index]}
          bubbleText=""
        />
      ))}
    </p>
  );
};

export default Text;
