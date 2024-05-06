// hooks need CSR
"use client";

// external imports
import React, { useEffect, useState, ReactNode } from "react";

// internal imports
import StyledButton from "@/ui/Button";

type ComponentProps = {
  ukrainianText: string[];
  englishText: string[];
};

const TestComponent = (props: ComponentProps) => {
  const [step, setStep] = useState(0); // step of array
  const [buttons, setButtons] = useState<ReactNode[]>([]); // state of answers' buttons

  useEffect(() => {
    // reset buttons to an empty array on each step change
    setButtons([]);

    // generate a random index to place the correct answer
    const randomNumber = Math.round(Math.random() * 3);

    // create buttons for each answer option
    for (
      let i = 0;
      // ensure we generate buttons for all answers, or just as many as available
      i < 4 || (props.englishText.length < 4 && i < props.englishText.length);
      i++
    ) {
      // shuffle the ukrainian words to randomize the order of answer options
      let shuffled;
      do {
        shuffled = [...props.ukrainianText].sort(() => Math.random() - 0.5);
      } while (props.ukrainianText[step] === shuffled[i]);

      // create a button for the correct answer at the random index
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

      // create buttons for the shuffled answers
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

  // function to check answer
  function checkAnswer(value: string, buttonIndex: number) {
    // find the index of the selected ukrainian word in the original array
    const mainWordIndex = props.ukrainianText.indexOf(value);

    // check if the selected answer matches the correct english translation
    if (props.englishText[step] === props.englishText[mainWordIndex]) {
      // if the answer is correct and it's the last question, reset the step to 0
      if (step === props.englishText.length - 1) {
        setStep(0);
        return;
      }
      // increment the step to move to the next question
      setStep((step) => step + 1);
      return;
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
      <h1 className="text-h2 mb-[31px] capitalize">
        {props.englishText[step]}
      </h1>
      <div className="flex flex-col sm:grid grid-cols-2 gap-[16px] sm:gap-[40px]">
        {buttons.map((button, index) => (
          <React.Fragment key={index}>{button}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TestComponent;
