"use client";

import React, { useEffect, useState, ReactNode } from "react";
import StyledButton from "@/ui/Button";

type ComponentProps = {
  ukrainianText: string[];
  englishText: string[];
};

const TestComponent = (props: ComponentProps) => {
  const [step, setStep] = useState(0);
  const [buttons, setButtons] = useState<ReactNode[]>([]);

  useEffect(() => {
    setButtons([]);
    const randomNumber = Math.round(Math.random() * 3);
    for (
      let i = 0;
      i < 4 || (props.englishText.length < 4 && i < props.englishText.length);
      i++
    ) {
      let shuffled;
      do {
        shuffled = [...props.ukrainianText].sort(() => Math.random() - 0.5);
      } while (props.ukrainianText[step] === shuffled[i]);
      if (randomNumber === i) {
        setButtons((state) => [
          ...state,
          <StyledButton
            variant="outlined"
            key={i}
            onClick={() => checkAnswer(props.ukrainianText[step], step)}
          >
            {props.ukrainianText[step]}
          </StyledButton>,
        ]);
        continue;
      }
      setButtons((state) => [
        ...state,
        <StyledButton
          variant="outlined"
          key={i}
          onClick={() => checkAnswer(shuffled[i], i)}
        >
          {shuffled[i]}
        </StyledButton>,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.englishText.length, props.ukrainianText, step]);

  function checkAnswer(value: string, buttonIndex: number) {
    const mainWordIndex = props.ukrainianText.indexOf(value);
    if (props.englishText[step] === props.englishText[mainWordIndex]) {
      if (step === props.englishText.length - 1) {
        setStep(0);
        return;
      }
      setStep((step) => step + 1);
      return;
    }

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
      <h1 className="text-h2 mb-[31px] capitalize">
        {props.englishText[step]}
      </h1>
      <div className="grid grid-cols-2 gap-[40px]">
        {buttons.map((button, index) => (
          <React.Fragment key={index}>{button}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TestComponent;
