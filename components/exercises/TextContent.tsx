// hooks need CSR
"use client";

// external imports
import axios from "axios";
import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useSelector } from "react-redux";

// internal imports
import { Store } from "@/modules/redux/store";
import { Word } from "@/modules/types/elements";
import { TextExerciseResponse } from "@/modules/types/responses";
import StyledButton from "@/ui/mui/Button";
import StyledLinearProgress from "@/ui/mui/LinearProgress";
import TranslationBubble from "./TranslationBubble";

type ContentProps = {
  collectionId: string;
};

const TextContent = (props: ContentProps) => {
  // state for translation words
  const [words, setWords] = useState<Word[]>([]);
  // state of text's words
  const [text, setText] = useState<string[]>([]);
  // state for ukrainian translation
  const [translation, setTranslation] = useState("");
  // state for step
  const [step, setStep] = useState(0);
  // state for confetti explosion
  const [isExploding, setIsExploding] = useState(false);

  // get user's info
  const user = useSelector((state: Store) => state.user);

  // use effect to fetch exerise
  useEffect(() => {
    async function fetchTexts() {
      try {
        const res: TextExerciseResponse = await axios.get(
          `/api/collection/${props.collectionId}/exercises/text`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        // get words
        const resWords = res.data.data.words;
        setWords(resWords);

        // get text and break it to array
        const text = res.data.data.text.text;
        setText(text.split(" "));

        // get translation
        const translationUk: string = res.data.data.text.translationUk;
        setTranslation(translationUk);
      } catch (error) {}
    }

    fetchTexts();
  }, [props.collectionId, user.token]);

  return (
    <div className="text-center flex flex-col items-center gap-[24px] relative">
      {text ? (
        <>
          <StyledLinearProgress
            variant="determinate"
            value={step ? (step > 1 ? 100 : 50) : 0}
          />
          {step ? (
            <p>
              {...text.map((word, index) => {
                const wordForBubble = words
                  .filter((object) => word.toLowerCase().includes(object.word))
                  .map(({ translationUk }, index) => ({
                    translationUk,
                    index,
                  }))[0];

                if (wordForBubble) {
                  return (
                    <TranslationBubble
                      key={index}
                      bubbleText={""}
                      text={`${word} `}
                      translationUk={wordForBubble.translationUk}
                      // englishText={["I", "love", "learning", "new", "languages."]} // dummy data
                      // ukrainianText={["Я", "люблю", "вивчати", "нові", "мови."]} // dummy data
                    />
                  );
                }
                return `${word} `;
              })}
            </p>
          ) : (
            <p>{translation}</p>
          )}
          {step < 1 ? (
            <StyledButton onClick={() => setStep(1)} variant="contained">
              Next
            </StyledButton>
          ) : (
            <StyledButton
              onClick={() => {
                setStep(2);
                setIsExploding(!isExploding);
              }}
              variant="contained"
              className="relative"
            >
              Finish
              {isExploding && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <ConfettiExplosion />
                </div>
              )}
            </StyledButton>
          )}
        </>
      ) : null}
    </div>
  );
};

export default TextContent;
