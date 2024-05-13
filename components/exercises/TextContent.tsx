"use client";

import React, { useEffect, useState } from "react";
import TranslationBubble from "./TranslationBubble";
import axios from "axios";
import { useSelector } from "react-redux";
import { Store } from "@/modules/redux/store";
import LinearProgress from "@mui/material/LinearProgress";

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

  useEffect(() => {
    async function fetchTexts() {
      try {
        const res = await axios.get(
          `http://54.92.220.133:8876/api/v1/collections/${props.collectionId}/text`,
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
    <div className="text-center flex flex-col gap-[24px] relative">
      <LinearProgress variant="determinate" value={step ? 50 : 0} />
      {step ? (
        <p>
          {...text.map((word, index) => {
            const wordForBubble = words
              .filter((object) => word.toLowerCase().includes(object.word))
              .map(({ translationUk }, index) => ({ translationUk, index }))[0];

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
      <button onClick={() => setStep(1)}>Next</button>
    </div>
  );
};

export default TextContent;
