// internal imports
import TranslationBubble from "@/components/exercises/TranslationBubble";

const Text = () => {
  const en = ["Some", "sentence", "with", "some", "text."]; // dummy english text
  const uk = ["Якесь", "речення", "із", "якимось", "текстом."]; // dummy ukrainian translation
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
