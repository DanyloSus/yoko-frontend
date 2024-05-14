"use client";

import React, { useEffect, useState } from "react";
import TranslationBubble from "./TranslationBubble";
import axios from "axios";
import { useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";
import LinearProgress from "@mui/material/LinearProgress";
import StyledLinearProgress from "@/ui/LinearProgress";
import StyledButton from "@/ui/Button";
import ConfettiExplosion from "react-confetti-explosion";

type Props = {
  collectionId: string;
};

type Word = {
  id: number;
  word: string;
  translationUk: string;
};

const TextContent = (props: Props) => {
  const [words, setWords] = useState<Word[]>([]);
  const [text, setText] = useState<string[]>([]);
  const [translation, setTranslation] = useState("");
  const [step, setStep] = useState(0);

  const user = useSelector((state: Store) => state.user);

  const [isExploding, setIsExploding] = React.useState(false);

  useEffect(() => {
    async function fetchTexts() {
      try {
        const res = await axios.get(
          `http://18.212.227.5:8876/api/v1/collections/${props.collectionId}/text`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const resWords = res.data.data.words;
        setWords(resWords);

        const text: string = res.data.data.text.text;
        setText(text.split(" "));

        const translationUk: string = res.data.data.text.translationUk;
        setTranslation(translationUk);
      } catch (error) {}
    }

    fetchTexts();
  }, []);

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
