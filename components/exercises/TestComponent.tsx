// hooks need CSR
"use client";

// external imports
import axios from "axios";
import {
  Fragment,
  ReactElement,
  ReactNode,
  cloneElement,
  useEffect,
  useState,
} from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useSelector } from "react-redux";

// internal imports
import { Store } from "@/modules/redux/store";
import { Question } from "@/modules/types/elements";
import { QuizExerciseResponse } from "@/modules/types/responses";
import StyledButton from "@/ui/mui/Button";
import StyledLinearProgress from "@/ui/mui/LinearProgress";
import { CircularProgress } from "@mui/material";

type ComponentProps = {
  // ukrainianText: string[];
  // englishText: string[];
  collectionId: string;
};

const TestComponent = (props: ComponentProps) => {
  const [isExploding, setIsExploding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(0); // step of array
  const [buttons, setButtons] = useState<ReactNode[]>([]); // state of answers' buttons
  const [completed, setCompleted] = useState(false);

  const [questions, setQuestions] = useState<Question[]>();

  // function to check answer
  function checkAnswer(isAnswer: boolean, buttonIndex: number) {
    // check if the selected answer matches the correct english translation
    if (isAnswer) {
      // if the answer is correct and it's the last question, reset the step to 0
      if (questions && step === questions.length - 1) {
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
          const buttonProps = (button as ReactElement).props;
          return cloneElement(button as ReactElement, {
            ...buttonProps,
            disabled: true,
          });
        }
        return button;
      })
    );
  }

  // get user's info
  const user = useSelector((state: Store) => state.user);

  // use effect to fetch quiz on start
  useEffect(() => {
    setIsLoading(true);

    async function fetchQuiz() {
      try {
        setButtons([]);
        const res: QuizExerciseResponse = await axios.get(
          `/api/collection/${props.collectionId}/exercises/test`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const questions = res.data.data;
        setQuestions(questions);

        let buttonsArray = [];
        for (let i = 0; i < 4; i++) {
          buttonsArray.push(
            <StyledButton
              variant="outlined"
              tabIndex={i}
              key={i}
              onClick={() =>
                checkAnswer(questions[step].answers[i].isAnswer, i)
              }
            >
              {questions[step].answers[i].translation}
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

  // use effect to set buttons on step changing
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
            onClick={() => checkAnswer(questions[step].answers[i].isAnswer, i)}
          >
            {questions[step].answers[i].translation}
          </StyledButton>
        );
      }

      setButtons(buttonsArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // if loading or questions don't exist then show load
  return isLoading || !questions ? (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <CircularProgress color="primary" />
    </div>
  ) : (
    <div className="text-center relative">
      <StyledLinearProgress
        value={
          completed ? 100 : Number(((100 * step) / questions.length).toFixed(2))
        }
      />
      <h1 className="text-h2 mb-[31px] capitalize">
        {/* {props.englishText[step]} */}
        {questions[step].word}
      </h1>
      <div className="flex flex-col sm:grid grid-cols-2 gap-[16px] sm:gap-[40px]">
        {buttons.map((button, index) => (
          <Fragment key={index}>{button}</Fragment>
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
