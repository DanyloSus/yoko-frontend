// external imports
import React, { ReactNode, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

// internal imports
import StyledButton from "@/ui/mui/Button";

const Test = () => {
  const [isExploding, setIsExploding] = React.useState(false); // state for confetti
  const [buttons, setButtons] = useState<ReactNode[]>([
    <StyledButton
      variant="outlined"
      key={0}
      onClick={() => checkAnswer("Вітаю", 0)}
    >
      Вітаю
    </StyledButton>,
    <StyledButton
      variant="outlined"
      key={1}
      onClick={() => checkAnswer("Кіт", 1)}
    >
      Кіт
    </StyledButton>,
    <StyledButton
      variant="outlined"
      key={2}
      onClick={() => checkAnswer("Телефон", 2)}
    >
      Телефон
    </StyledButton>,
    <StyledButton
      variant="outlined"
      key={3}
      onClick={() => checkAnswer("Яблуко", 3)}
    >
      Яблуко
    </StyledButton>,
  ]); // state of answers' buttons

  function checkAnswer(answer: string, buttonIndex: number) {
    // check answer
    if (answer === "Вітаю") {
      setIsExploding(true);
    }
    // disable the selected button if the answer is incorrect
    setButtons((buttons) =>
      buttons.map((button, index) => {
        if (index === buttonIndex) {
          const buttonProps = (button as React.ReactElement).props;
          return React.cloneElement(button as React.ReactElement, {
            ...buttonProps,
            disabled: true,
          });
        }
        return button;
      })
    );
  }
  return (
    <div className="text-center relative">
      <h1 className="text-h2 mb-[31px] capitalize">Hello</h1>
      <div className="flex flex-col sm:grid grid-cols-2 gap-[16px] sm:gap-[40px]">
        {buttons}
      </div>
      {isExploding && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ConfettiExplosion />
        </div>
      )}
    </div>
  );
};

export default Test;
