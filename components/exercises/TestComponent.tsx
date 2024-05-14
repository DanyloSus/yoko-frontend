// hooks need CSR
"use client";

// external imports
import React, { useEffect, useState, ReactNode } from "react";

// internal imports
import StyledButton from "@/ui/Button";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";
import StyledLinearProgress from "@/ui/LinearProgress";
import ConfettiExplosion from "react-confetti-explosion";

type ComponentProps = {
  // ukrainianText: string[];
  // englishText: string[];
  collectionId: string;
};

type VariantOfAnswer = {
  id: number;
  translation: string;
  isAnswer: boolean;
};

type Question = {
  word: string;
  answers: VariantOfAnswer[];
};

type QuizResponse = {
  data: Question[];
};

const TestComponent = (props: ComponentProps) => {
  const [isExploding, setIsExploding] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(0); // step of array
  const [buttons, setButtons] = useState<ReactNode[]>([]); // state of answers' buttons
  const [completed, setCompleted] = useState(false);

  const [questions, setQuestions] = useState<QuizResponse>();

  // function to check answer
  function checkAnswer(isAnswer: boolean, buttonIndex: number) {
    // check if the selected answer matches the correct english translation
    if (isAnswer) {
      // if the answer is correct and it's the last question, reset the step to 0
      if (questions && step === questions.data.length - 1) {
        setIsExploding(true);
        setCompleted(true);
        setStep(0);
        return;
      }
      // increment the step to move to the next question
      setStep((step) => step + 1);
      setIsExploding(false);
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

  const user = useSelector((state: Store) => state.user);

  useEffect(() => {
    setIsLoading(true);

    async function fetchQuiz() {
      try {
        setButtons([]);
        const { data }: { data: QuizResponse } = await axios.get(
          `http://18.212.227.5:8876/api/v1/collections/${props.collectionId}/quiz`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        setQuestions(data);
        console.log(data);

        let buttonsArray = [];
        for (let i = 0; i < 4; i++) {
          buttonsArray.push(
            <StyledButton
              variant="outlined"
              tabIndex={i}
              key={i}
              onClick={() =>
                checkAnswer(data.data[step].answers[i].isAnswer, i)
              }
            >
              {data.data[step].answers[i].translation}
            </StyledButton>
          );
        }

        setButtons(buttonsArray);
      } catch (error) {}
    }

    fetchQuiz();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (questions) {
      setButtons([]);
      let buttonsArray = [];
      for (let i = 0; i < 4; i++) {
        buttonsArray.push(
          <StyledButton
            variant="outlined"
            tabIndex={i}
            key={i}
            onClick={() =>
              checkAnswer(questions.data[step].answers[i].isAnswer, i)
            }
          >
            {questions.data[step].answers[i].translation}
          </StyledButton>
        );
      }

      setButtons(buttonsArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return isLoading || questions === undefined ? (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <CircularProgress color="primary" />
    </div>
  ) : (
    <div className="text-center relative">
      <StyledLinearProgress
        value={
          completed
            ? 100
            : Number(((100 * step) / questions.data.length).toFixed(2))
        }
      />
      <h1 className="text-h2 mb-[31px] capitalize">
        {/* {props.englishText[step]} */}
        {questions.data[step].word}
      </h1>
      <div className="flex flex-col sm:grid grid-cols-2 gap-[16px] sm:gap-[40px]">
        {buttons.map((button, index) => (
          <React.Fragment key={index}>{button}</React.Fragment>
        ))}
      </div>
      {isExploding && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ConfettiExplosion />
        </div>
      )}
    </div>
  );
};

export default TestComponent;
