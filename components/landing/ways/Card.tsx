// internal imports
import Card from "@/components/exercises/Card";
import { CardTexts } from "@/modules/types/texts";

const CardExercise = ({ translate, back }: CardTexts) => {
  return (
    <div className="max-w-[360px] w-full h-full min-h-[294px]">
      <Card
        back={() => {}}
        englishWord="Hello"
        forward={() => {}}
        ukrainianWord="Вітаю"
        isSmall
        texts={{
          back: back,
          translate: translate,
        }}
      />
    </div>
  );
};

export default CardExercise;
